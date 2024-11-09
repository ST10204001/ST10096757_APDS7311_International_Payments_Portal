import rateLimit from 'express-rate-limit';

// Rate Limiting Setup
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 100,  // Limit each IP to 100 requests per window
});

const setupRateLimit = (app) => {
    app.use(limiter);
};

export default setupRateLimit;
