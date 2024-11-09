import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';

const setupSession = (app) => {
    app.use(cookieParser()); // Cookie parser
    app.use(cookieSession({
        name: 'session',
        keys: ['your_secret_key'], // Use a strong secret key
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    }));
};

export default setupSession;
