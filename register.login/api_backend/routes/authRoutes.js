// api_backend/routes/authRoutes.js
import express from 'express';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import expressBrute from 'express-brute';

const router = express.Router();
const memoryStore = new expressBrute.MemoryStore();
const bruteforce = new expressBrute(memoryStore, { freeRetries: 5, minWait: 5000, maxWait: 60000, lifetime: 3600 });

function validateInput({ username, password, userFirstName, userLastName, idNumber, accountNumber }) {
    // Add input validation logic here...
    // Returning null for simplicity
    return null;
}

// Register route
router.post('/register', bruteforce.prevent, async (req, res) => {
    const { username, password, userFirstName, userLastName, idNumber, accountNumber } = req.body;
    const validationError = validateInput({ username, password, userFirstName, userLastName, idNumber, accountNumber });
    
    if (validationError) return res.status(400).json({ error: validationError });
    
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: 'Username already exists' });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, userFirstName, userLastName, password: hashedPassword, idNumber, accountNumber });
    
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
});

// Login route
router.post('/login', bruteforce.prevent, async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
        res.cookie('userToken', user._id.toString(), { httpOnly: true });
        res.status(200).send('Login successful');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

export default router;
