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
    body('username').matches(/^[a-zA-Z0-9]{3,20}$/).withMessage('Invalid input. Please try again.'),
    body('password').isLength({ min: 6 }).matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/).withMessage('Invalid input. Please try again.'),
    body('idNumber').matches(/^[0-9]{13}$/).withMessage('Invalid input. Please try again.'),
    body('accountNumber').matches(/^[0-9]{10}$/).withMessage('Invalid input. Please try again.'),
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
                return res.status(400).json({ error: 'Invalid input. Please try again.' });
            }
        } else {
            // Regular user login requires account number verification
            if (user.accountNumber !== accountNumber) {
                return res.status(400).json({ error: 'Invalid input. Please try again.' });
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
                return res.status(400).json({ error: 'Invalid input. Please try again.' });
            }
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to get the current logged-in user's data
router.get('/current-user', async (req, res) => {
    if (req.session.user) {
        return res.status(200).json({
            username: req.session.user.username,
            firstName: req.session.user.firstName,
            lastName: req.session.user.lastName,
            isEmployee: req.session.user.isEmployee,
        });
    } else {
        return res.status(401).json({ error: 'Not logged in' });
    }
});

export default router;
