import express from 'express';
import Transaction from '../models/transaction.js';
import User from '../models/user.js';
import authMiddleware from '../middleware/authMiddleware.js'; // Middleware to check if the user is logged in

const router = express.Router();

// Middleware to verify if the user is authenticated
router.use(authMiddleware);

// Create a new transaction
router.post('/transaction', async (req, res) => {
  const { userToSendTo, userAccount, amount, currency, provider } = req.body;

  try {
    const userId = req.user.id; // Get the logged-in user's ID from the authMiddleware

    // Optional: You can validate the userToSendTo, userAccount, or other fields here

    // Create a new transaction object
    const transaction = new Transaction({
      user: userId,
      userToSendTo,
      userAccount,
      amount,
      currency,
      provider,
    });

    // Save the transaction to the database
    await transaction.save();

    res.status(200).json({ message: 'Transaction successful', transaction });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
