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

// Middleware for CORS
app.use(cors({
    origin: 'https://localhost:3001',  // Ensure this matches the frontend URL
    credentials: true,  // Allow credentials (cookies)
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
mongoose.connect('mongodb+srv://monajackson98:Kc9gZY2EAkj5mIs9@cluster0.uxhruuc.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch(err => {
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

const User = mongoose.model('User', userSchema);

// Helper function to validate input
function validateInput({ username, password, userFirstName, userLastName, idNumber, accountNumber }) {
    const usernamePattern = /^[a-zA-Z0-9_]+$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W]{8,}$/;
    const namePattern = /^[a-zA-Z\s]+$/;
    const idNumberPattern = /^\d{13}$/;
    const accountNumberPattern = /^\d{8,12}$/;

    if (!usernamePattern.test(username)) {
        return 'Invalid username';
    }
    if (!passwordPattern.test(password)) {
        return 'Invalid password';
    }
    if (!namePattern.test(userFirstName)) {
        return 'Invalid first name';
    }
    if (!namePattern.test(userLastName)) {
        return 'Invalid last name';
    }
    if (!idNumberPattern.test(idNumber)) {
        return 'Invalid ID number';
    }
    if (!accountNumberPattern.test(accountNumber)) {
        return 'Invalid account number';
    }

    return null;  // All inputs are valid
}

// Register Route
app.post('/api/register', bruteforce.prevent, async (req, res) => {
    const { username, password, userFirstName, userLastName, idNumber, accountNumber } = req.body;

    const validationError = validateInput({ username, password, userFirstName, userLastName, idNumber, accountNumber });
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

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
        accountNumber 
    });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
});

// Login Route
app.post('/api/login', bruteforce.prevent, async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.cookie('userToken', user._id.toString(), { httpOnly: true });
        res.status(200).send('Login successful');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Health Check Route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

export default app;
