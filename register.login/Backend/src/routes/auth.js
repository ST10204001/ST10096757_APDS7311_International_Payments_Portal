import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import expressBrute from 'express-brute';
import bruteforce from '../middleware/bruteForce.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Register Route with validation
router.post('/register', [
    bruteforce.prevent,
    body('username').matches(/^[a-zA-Z0-9]{3,20}$/).withMessage('Username must be 3-20 alphanumeric characters'),
    body('password').isLength({ min: 6 }).matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/).withMessage('Password must be at least 6 characters, including at least one letter and one number'),
    body('idNumber').matches(/^[0-9]{13}$/).withMessage('ID Number must be a 13-digit number'),
    body('accountNumber').matches(/^[0-9]{10}$/).withMessage('Account Number must be a 10-digit number'),
    
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, userFirstName, userLastName, idNumber, accountNumber } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, userFirstName, userLastName, password: hashedPassword, idNumber, accountNumber });
        
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Login Route wuth validation
router.post('/login', [
    bruteforce.prevent,
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
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
