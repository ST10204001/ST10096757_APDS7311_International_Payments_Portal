const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://localhost:3002',
            changeOrigin: true,
            secure: false,  // Allow self-signed certs for local development
            logLevel: 'debug', // For more verbose logs
        })
    );
};
