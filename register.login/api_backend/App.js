import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import bcrypt from 'bcryptjs';
import helmet from 'helmet';
import expressBrute from 'express-brute';
import rateLimit from 'express-rate-limit';
import xssClean from 'xss-clean'; // XSS protection middleware

const app = express();

// Trust the first proxy (for rate limiting to work properly with X-Forwarded-For header)
app.set('trust proxy', 1);

// Middleware for CORS
app.use(cors({
    origin: 'https://localhost:5001',  // Frontend URL - allow your frontend to communicate with the backend
    credentials: true, // Allow credentials such as cookies to be sent
}));

app.use(helmet({
    frameguard: { action: 'deny' }, // Clickjacking protection
}));

app.use(xssClean());  // Protect against XSS attacks
app.use(express.json());  // JSON body parser
app.use(cookieParser());  // Cookie parser
app.use(cookieSession({
    name: 'session',
    keys: ['your_secret_key'],  // Use a strong secret key
    maxAge: 24 * 60 * 60 * 1000  // 24 hours
}));

// Rate Limiting Setup
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 100,  // Limit each IP to 100 requests per window
});
app.use(limiter);

// Set HSTS (HTTP Strict Transport Security)
app.use((req, res, next) => {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains"); // HSTS
    next();
});

const memoryStore = new expressBrute.MemoryStore();  // In-memory store for Brute Force protection
const bruteforce = new expressBrute(memoryStore, {
    freeRetries: 5,
    minWait: 5000,
    maxWait: 60000,
    lifetime: 3600,
});

// MongoDB Connection
mongoose.connect('mongodb+srv://monajackson98:Kc9gZY2EAkj5mIs9@cluster0.uxhruuc.mongodb.net/test', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => {
    console.log('Database connected successfully');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// User Schema and Model
const userSchema = new mongoose.Schema({
    username: String,
    userFirstName: String,
    userLastName: String,
    password: String,
    idNumber: String,
    accountNumber: String
});

const User = mongoose.model('users', userSchema);

// Register Route
app.post('/api/register', bruteforce.prevent, async (req, res) => {
    console.log('Received request for registration:', req.body);
    const { username, password, userFirstName, userLastName, idNumber, accountNumber } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            userFirstName,
            userLastName,
            password: hashedPassword,
            idNumber,
            accountNumber,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Export the app
export default app;
