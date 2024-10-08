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

// Middleware
app.use(cors({
    origin: 'http://localhost:3001', // Specify the frontend URL
    credentials: true, // Enable sending cookies or HTTP credentials
}));
app.use(helmet({
    frameguard: { action: 'deny' } // Enable Clickjacking protection
})); 
app.use(xssClean()); // Protect against XSS attacks
app.use(express.json()); // For sending and receiving data
app.use(cookieParser()); // For parsing cookies
app.use(cookieSession({
    name: 'session',
    keys: ['your_secret_key'], // Use a strong secret key
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
});

// Apply rate limiting to all requests
app.use(limiter);

// Set Strict-Transport-Security header for HSTS
app.use((req, res, next) => {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains"); // HSTS
    next();
});

const memoryStore = new expressBrute.MemoryStore(); // In-memory store
const bruteforce = new expressBrute(memoryStore, {
    freeRetries: 5,
    minWait: 5000,
    maxWait: 60000,
    lifetime: 3600,
});

// MongoDB Connection
mongoose.connect('mongodb+srv://monajackson98:Kc9gZY2EAkj5mIs9@cluster0.uxhruuc.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Database running successfully');
})
.catch(error => {
    console.log('There is a connection error:', error);
});

// Creating Schema
const userSchema = new mongoose.Schema({
    username: String,
    userFirstName: String,
    userLastName: String,
    password: String,
    idNumber: String,
    accountNumber: String
});

// Creating Model
const User = mongoose.model('User', userSchema);

// Helper function to validate input using RegEx patterns
function validateInput({ username, password, userFirstName, userLastName, idNumber, accountNumber }) {
    const usernamePattern = /^[a-zA-Z0-9_]+$/; // Alphanumeric with underscores
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W]{8,}$/; // Minimum 8 characters, letters, and numbers, allows special characters
    const namePattern = /^[a-zA-Z\s]+$/; // Alphabetic characters and spaces
    const idNumberPattern = /^\d{13}$/; // 13 numeric digits
    const accountNumberPattern = /^\d{8,12}$/; // 8 to 12 digit numbers

    if (!usernamePattern.test(username)) {
        return 'Invalid username: Only alphanumeric characters and underscores (_) are allowed.';
    }
    if (!passwordPattern.test(password)) {
        return 'Invalid password: Must be at least 8 characters long, include at least one letter and one number, and may include special characters.';
    }
    if (!namePattern.test(userFirstName)) {
        return 'Invalid first name: Only alphabetic characters and spaces are allowed.';
    }
    if (!namePattern.test(userLastName)) {
        return 'Invalid last name: Only alphabetic characters and spaces are allowed.';
    }
    if (!idNumberPattern.test(idNumber)) {
        return 'Invalid ID number: Must be exactly 13 numeric digits.';
    }
    if (!accountNumberPattern.test(accountNumber)) {
        return 'Invalid account number: Must be between 8 and 12 numeric digits.';
    }

    return null; // All inputs are valid
}

// Routes
// Register
app.post('/api/register', bruteforce.prevent, async (req, res) => {
    try {
        const { username, password, userFirstName, userLastName, idNumber, accountNumber } = req.body;

        // Validate inputs using RegEx
        const validationError = validateInput({ username, password, userFirstName, userLastName, idNumber, accountNumber });
        if (validationError) {
            return res.status(400).json({ error: validationError }); // Send validation error message as JSON
        }

        // Check if username already exists
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error registering user: ' + error.message }); 
    }
});

// Login
app.post('/api/login', bruteforce.prevent, async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.cookie('userToken', user._id.toString(), { httpOnly: true });
            res.status(200).send('Login successfully');
        } else {
            res.status(401).send('Invalid Credentials');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in user: ' + error.message);
    }
});

// Logout
app.post('/api/logout', (req, res) => {
    res.clearCookie('userToken');
    res.status(200).send('Logout successful');
});

// Authenticate User
const authenticateUser = async (req, res) => {
    const userId = req.cookies.userToken;

    if (!userId) {
        return res.status(401).send('Unauthorized');
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).send('Unauthorized');
        } else {
            const users = {
                userName: user.username
            };
            return res.status(201).json(users);
        }
    } catch (error) {
        res.status(500).send('Error authenticating user');
    }
};

// Dashboard route
app.get('/dashboard', authenticateUser, (req, res) => {
    res.status(200).send('Dashboard access granted');
});

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

// Export the app for use in server.js
export default app;
