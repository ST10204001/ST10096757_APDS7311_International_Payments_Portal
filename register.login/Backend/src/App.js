import express from 'express';
import setupCors from './config/cors.js';
import setupHelmet from './config/helmet.js';
import setupRateLimit from './config/rateLimit.js';
import setupSession from './config/session.js';
import setupXSSProtection from './middleware/xssProtection.js';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import transRoutes from './routes/transaction.js';
import logger from './utils/logger.js';
import setupHSTS from './config/hsts.js';  // Import the HSTS setup


const app = express();

// Trust the first proxy (if you're behind a reverse proxy)
app.set('trust proxy', 1);

// Connect to the database
connectDB();

// Set up middlewares
app.use(logger);
setupCors(app);
setupHelmet(app);
setupRateLimit(app);
setupSession(app);
setupXSSProtection(app);

// JSON body parser
app.use(express.json());  // JSON body parser

// Set up HSTS
setupHSTS(app);

// Register routes
app.use('/api', authRoutes);
app.use('/api', transRoutes);

// Health Check Route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

export default app;
