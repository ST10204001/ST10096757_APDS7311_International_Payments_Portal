import http from 'http';
import https from 'https';
import fs from 'fs';
import app from './src/App.js';

// Add logging to verify requests
app.use((req, res, next) => {
    console.log('Incoming request:', req.method, req.url); // Log each request
    next();
});

// SSL configuration (if you're still using it)
const sslOptions = {
    key: fs.readFileSync('./keys/server.key'),  // Path to your private key
    cert: fs.readFileSync('./keys/server.crt'), // Path to your certificate
};

// Define HTTPS port (5000) or use environment variable
const PORT = process.env.PORT || 5000;

// Create and start the HTTPS server with SSL options
const httpsServer = https.createServer(sslOptions, app);

httpsServer.listen(5000, () => {
    console.log(`HTTPS server running on port ${PORT}`);
});
