import xssClean from 'xss-clean';

// Protect against XSS attacks
const setupXSSProtection = (app) => {
    app.use(xssClean());
};

export default setupXSSProtection;
