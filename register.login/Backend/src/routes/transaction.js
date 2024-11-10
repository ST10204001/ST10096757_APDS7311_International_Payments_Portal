import express from 'express';
import Transaction from '../models/Transaction.js'; 
import User from '../models/User.js';  // Import the User model
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect the /transaction route with authentication middleware
router.post('/transaction', authMiddleware, async (req, res) => {
  const { userToSendTo, userAccount, amount, currency, provider } = req.body;

  try {
    const userId = req.session.user.id; // Retrieve the user ID from session
    
    // Fetch the user from the database to validate the account number
    const user = await User.findById(userId);
    
    // Check if the account number entered matches the one stored in the user's record
    if (userAccount !== user.accountNumber) {
      return res.status(400).json({ error: 'Account number does not match your registered account.' });
    }

    // If account number matches, proceed with the transaction
    const transaction = new Transaction({
      user: userId,
      userToSendTo,
      userAccount,
      amount,
      currency,
      provider,
      status: 'pending'  // Add status field to track the transaction state
    });

    await transaction.save();

    res.status(200).json({ message: 'Transaction successful!' });
  } catch (error) {
    console.error('Transaction error:', error);
    res.status(500).json({ error: 'Transaction failed. Please try again.' });
  }
});

export default router;
