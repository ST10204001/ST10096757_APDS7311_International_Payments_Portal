import express from 'express';
import https from 'https';
import http from 'http';
import fs from 'fs';
import mongoose from 'mongoose';
import cors from 'cors'; // Import CORS
import app from './App.js'; // Import the app from App.js

// Load SSL certificate and key for HTTPS
const sslOptions = {
    key: fs.readFileSync('./keys/server.key'),  // Path to your private key
    cert: fs.readFileSync('./keys/server.crt'), // Path to your certificate
};

// Middleware to ensure CORS works with the correct origin
app.use(cors({
    origin: 'https://localhost:3002',  // Allow requests from this frontend origin
    credentials: true, // Enable sending cookies and HTTP credentials
}));

// Create HTTP server for redirecting all HTTP traffic to HTTPS
/*const httpServer = http.createServer((req, res) => {
    res.writeHead(301, { "Location": `https://${req.headers.host.replace('3000', '3001')}${req.url}` });
    res.end();
});

// Start HTTP server on port 3000 (redirects to HTTPS)
httpServer.listen(3000, () => {
    console.log('HTTP server running on port 3000 and redirecting to HTTPS');
});*/

// Add logging to verify requests
app.use((req, res, next) => {
    console.log('Incoming request:', req.method, req.url); // Log each request
    next();
});

// Define HTTPS port (3001) or use environment variable
const PORT = process.env.PORT || 3002;

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

process.on('SIGTERM', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    process.exit(0);
});
