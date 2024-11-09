import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import expressBrute from 'express-brute';
import bruteforce from '../middleware/bruteForce.js';

const router = express.Router();

// Register Route
router.post('/register', bruteforce.prevent, async (req, res) => {
    const { username, password, userFirstName, userLastName, idNumber, accountNumber, isEmployee } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, userFirstName, userLastName, password: hashedPassword, idNumber, accountNumber, isEmployee });
        
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Login Route
router.post('/login', bruteforce.prevent, async (req, res) => {
    const { username, password, isEmployee } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).send('Invalid credentials');
    }

    // If it's an employee login attempt, check if the user is an employee
    if (isEmployee && !user.isEmployee) {
        return res.status(401).send('Employee login required');
    }

    // If it's a regular user login attempt, ensure user is not an employee
    if (!isEmployee && user.isEmployee) {
        return res.status(401).send('Regular user login required');
    }

    if (await user.isPasswordMatch(password)) {
        res.cookie('userToken', user._id.toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        });
        res.status(200).send('Login successful');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

export default router;
