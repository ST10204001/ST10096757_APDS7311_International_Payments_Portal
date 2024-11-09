import cors from 'cors';

const corsOptions = {
    origin: 'https://localhost:5001', // Frontend URL
    credentials: true, // Allow cookies to be sent
};

const setupCors = (app) => {
    app.use(cors(corsOptions));
};

export default setupCors;
