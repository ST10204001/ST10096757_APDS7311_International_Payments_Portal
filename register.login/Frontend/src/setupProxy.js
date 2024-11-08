const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',  // API path prefix
        createProxyMiddleware({
            target: 'https://localhost:5000',  // Backend server running on port 5000
            changeOrigin: true,  // Adjust the origin header for the request
            secure: false,  // Allow self-signed certs for local development
            logLevel: 'debug',  // Enable verbose logging
        })
    );
};