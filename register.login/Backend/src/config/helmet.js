import helmet from 'helmet';

// Clickjacking protection
const setupHelmet = (app) => {
    app.use(helmet({
        frameguard: { action: 'deny' },
    }));
};

export default setupHelmet;
