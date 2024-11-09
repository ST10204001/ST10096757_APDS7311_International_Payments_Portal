import express from 'express';
import Transaction from '../models/Transaction.js'; // Import Transaction model
import authenticateUser from '../middleware/authMiddleware.js'; // Default import

const router = express.Router();

// Apply the authentication middleware to this route
router.post('/transaction', authenticateUser, async (req, res) => {
  const { userToSendTo, userAccount, amount, currency, provider } = req.body;

  try {
    // Assuming you have authentication logic here to check if the user is logged in
    if (!req.session.user || !req.session.user.id) {
      return res.status(401).json({ error: 'Unauthorized. Please log in.' });
    }

    const userId = req.session.user.id; // Get the user ID from the session

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
