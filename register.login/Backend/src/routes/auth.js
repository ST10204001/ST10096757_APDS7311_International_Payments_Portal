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
    body('password').isLength({ min: 6 }).matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/).withMessage('Password must be at least 6 characters, including at least one letter, one number, and can contain special characters'),
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

// Login Route with Validation and Employee Logic
router.post('/login', [
    bruteforce.prevent,
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, isEmployee, accountNumber } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // Check if the user is an employee
        if (user.isEmployee) {
            // Employee login does not require account number
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                // Set session data for employee login
                req.session.user = {
                    id: user._id,
                    username: user.username,
                    firstName: user.userFirstName,
                    lastName: user.userLastName,
                    isEmployee: user.isEmployee,
                };

                // Respond with success for employee login
                return res.status(200).json({ message: 'Employee login successful' });
            } else {
                return res.status(400).json({ error: 'Invalid password' });
            }
        } else {
            // Regular user login requires account number verification
            if (user.accountNumber !== accountNumber) {
                return res.status(400).json({ error: 'Invalid account number' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                // Set session data for regular user login
                req.session.user = {
                    id: user._id,
                    username: user.username,
                    firstName: user.userFirstName,
                    lastName: user.userLastName,
                    isEmployee: user.isEmployee,
                    accountNumber: user.accountNumber,  // Store account number for regular users
                };

                // Respond with success for regular user login
                return res.status(200).json({ message: 'User login successful' });
            } else {
                return res.status(400).json({ error: 'Invalid password' });
            }
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;