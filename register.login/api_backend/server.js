import express from 'express';
import https from 'https';
import http from 'http';
import fs from 'fs';
import mongoose from 'mongoose';
import cors from 'cors'; // Import CORS
import app from './App.js'; // Import the app from App.js
import multer from 'multer';  // To handle file uploads
import path from 'path';

const app = express();
// Load SSL certificate and key for HTTPS
const sslOptions = {
    key: fs.readFileSync('./keys/server.key'),  // Path to your private key
    cert: fs.readFileSync('./keys/server.crt'), // Path to your certificate
};

// Middleware to ensure CORS works with the correct origin
app.use(cors({
    origin: 'https://localhost:3001',  // Allow requests from this frontend origin
    credentials: true, // Enable sending cookies and HTTP credentials
}));

// Create HTTP server for redirecting all HTTP traffic to HTTPS
const httpServer = http.createServer((req, res) => {
    res.writeHead(301, { "Location": `https://${req.headers.host.replace('3000', '3001')}${req.url}` });
    res.end();
});

// Start HTTP server on port 3000 (redirects to HTTPS)
httpServer.listen(3000, () => {
    console.log('HTTP server running on port 3000 and redirecting to HTTPS');
});

// Define HTTPS port (3001) or use environment variable
const PORT = process.env.PORT || 3001;

// Create and start the HTTPS server with SSL options
const httpsServer = https.createServer(sslOptions, app);

httpsServer.listen(PORT, () => {
    console.log(`HTTPS server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    process.exit(0);
});
// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    firstName: String,
    lastName: String,
    profilePicture: String, // Store the file path of the profile picture
});
const User = mongoose.model('User', userSchema);

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: './uploads', // Folder to store profile pictures
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});
const upload = multer({ storage });

// Static folder for uploaded images
app.use('/uploads', express.static('uploads'));

// Routes

// Get user profile data
app.get('/api/getUserData', async (req, res) => {
    try {
        const userId = req.query.userId; // Assume user ID is passed as a query parameter
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Error fetching user data' });
    }
});

// Update user profile picture
app.post('/api/uploadProfilePicture', upload.single('profilePicture'), async (req, res) => {
    try {
        const userId = req.body.userId; // Assume user ID is passed in the request body
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user's profile picture path
        user.profilePicture = req.file.filename;
        await user.save();

        res.json({ profilePicture: user.profilePicture });
    } catch (error) {
        console.error('Error uploading profile picture:', error);
        res.status(500).json({ error: 'Error uploading profile picture' });
    }
});

process.on('SIGTERM', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    process.exit(0);
});
