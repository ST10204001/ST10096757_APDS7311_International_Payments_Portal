import express from 'express';
import Transaction from '../models/Transaction.js'; 
import authMiddleware from '../middleware/authMiddleware.js';  // Import the updated middleware

const router = express.Router();

// Protect the /transaction route with authentication middleware
router.post('/transaction', authMiddleware, async (req, res) => {
  const { userToSendTo, userAccount, amount, currency, provider } = req.body;

  try {
    const userId = req.session.user.id; // Retrieve the user ID from session

    const transaction = new Transaction({
      user: userId,
      userToSendTo,
      userAccount,
      amount,
      currency,
      provider,
    });

    await transaction.save();

    res.status(200).json({ message: 'Transaction successful!' });
  } catch (error) {
    console.error('Transaction error:', error);
    res.status(500).json({ error: 'Transaction failed. Please try again.' });
  }
});

export default router;
