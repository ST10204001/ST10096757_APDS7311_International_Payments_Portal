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
router.post('/login', async (req, res) => {
    const { username, password, accountNumber } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // Check if the user is an employee
        if (user.isEmployee) {
            // Employee login does not require account number
            if (await bcrypt.compare(password, user.password)) {
                // Respond with success for employee login
                return res.status(200).json({ message: 'Employee login successful' });
            } else {
                return res.status(400).json({ error: 'Invalid password' });
            }
        } else {
            // Normal user login requires account number
            if (user.accountNumber !== accountNumber) {
                return res.status(400).json({ error: 'Invalid account number' });
            }
            if (await bcrypt.compare(password, user.password)) {
                // Respond with success for regular user login
                return res.status(200).json({ message: 'User login successful' });
            } else {
                return res.status(400).json({ error: 'Invalid password' });
            }
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
