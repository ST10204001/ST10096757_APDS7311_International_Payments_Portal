import app from './App.js'; 
import https from 'https';
import http from 'http';
import fs from 'fs';
import mongoose from 'mongoose';
import cors from 'cors'; // Import cors

// Load SSL certificate and key
const sslOptions = {
    key: fs.readFileSync('./keys/server.KEY'),  // Path to your private key
    cert: fs.readFileSync('./keys/server.crt'),    // Path to your certificate
};

app.use(cors({
    origin: 'https://localhost:3001', // Allow requests from your frontend's origin
    credentials: true, // Enable sending cookies or HTTP credentials
}));

// Create HTTP server for redirection
const httpServer = http.createServer((req, res) => {
    // Redirect all HTTP requests to HTTPS
    res.writeHead(301, { "Location": `https://${req.headers.host}${req.url}` });
    res.end();
});

// Start the HTTP server (optional for redirection)
httpServer.listen(3000, () => {
    console.log('HTTP server running on port 3000, redirecting to HTTPS');
});

// Define HTTPS port (default 3001 or set via environment variable)
const PORT = process.env.PORT || 3001;

// Create and start the HTTPS server
const httpsServer = https.createServer(sslOptions, app);

httpsServer.listen(PORT, () => {
    console.log(`HTTPS server running on port ${PORT}`);
});

// Graceful shutdown and cleanup on server termination signals
process.on('SIGINT', async () => {
    await mongoose.connection.close(); 
    console.log('MongoDB connection closed');
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    process.exit(0);
});
