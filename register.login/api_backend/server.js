import app from './App.js'; 
import https from 'https';
import http from 'http';
import fs from 'fs';
import mongoose from 'mongoose';

// Load SSL certificate and key
const sslOptions = {
    key: fs.readFileSync('./keys/private.key'),
    cert: fs.readFileSync('./keys/certificate.crt'),
};

// Create HTTP server for redirection
const httpServer = http.createServer((req, res) => {
    // Redirect all HTTP requests to HTTPS
    res.writeHead(301, { "Location": `https://${req.headers.host}${req.url}` });
    res.end();
});

// Start the HTTP server
httpServer.listen(3000, () => {
    console.log('HTTP server running on port 3000');
});

// Create HTTPS server
const PORT = process.env.PORT || 3443; // Change to 3443 or your desired HTTPS port
const httpsServer = https.createServer(sslOptions, app);

// Start the HTTPS server
httpsServer.listen(PORT, () => {
    console.log(`HTTPS server running on port ${PORT}`);
});

// Proper cleanup on server shutdown
/*process.on('SIGINT', async () => {
    await mongoose.connection.close(); // Now this should work
    console.log('MongoDB connection closed');
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await mongoose.connection.close(); // Now this should work
    console.log('MongoDB connection closed');
    process.exit(0);
});*/
