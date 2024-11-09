import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';

const setupSession = (app) => {
    app.use(cookieParser());  // Cookie parser is required for session middleware
    app.use(cookieSession({
        name: 'session',
        keys: ['your_secret_key'],  // Ensure this is a secure and random key
        maxAge: 24 * 60 * 60 * 1000,  // Session expiry (1 day)
        secure: process.env.NODE_ENV === 'production',  // Only enable secure cookies in production (check if you're in dev mode)
    }));
};

export default setupSession;
