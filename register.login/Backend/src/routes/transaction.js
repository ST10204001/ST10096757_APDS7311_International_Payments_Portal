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
<<<<<<< HEAD
      status: 'pending'  // Add status field to track the transaction state
=======
      //status: 'pending' // Add status field to track the transaction state
>>>>>>> 9f3e2a4fe62d985e2f3015f2fe8b67f91d42afef
    });

    await transaction.save();

    res.status(200).json({ message: 'Transaction successful!' });
  } catch (error) {
    console.error('Transaction error:', error);
    res.status(500).json({ error: 'Transaction failed. Please try again.' });
  }
});

<<<<<<< HEAD
=======
//endpoint to fetch all transactions 
router.get('\transactions', authMiddleware, async (req, res) => {
      try {        
        const transactions = await Transaction.find();        
        res.json(transactions);    
      } catch (error) {        
        console.error('Error fetching transactions:', error);        
        res.status(500).json({ error: 'Failed to fetch transactions' });    
      }
});

// Endpoint to approve a transaction
router.post('/transactions/approve/:id', authMiddleware, async (req, res) => {
  try {
    const transactionId = req.params.id;
    await Transaction.findByIdAndUpdate(transactionId, { status: 'approved' });
    res.json({ message: 'Transaction approved!' });
  } catch (error) {
    console.error('Error approving transaction:', error);
    res.status(500).json({ error: 'Failed to approve transaction' });
  }
});

// Endpoint to deny a transaction
router.post('/transactions/deny/:id', authMiddleware, async (req, res) => {
  try {
    const transactionId = req.params.id;
    await Transaction.findByIdAndUpdate(transactionId, { status: 'denied' });
    res.json({ message: 'Transaction denied!' });
  } catch (error) {
    console.error('Error denying transaction:', error);
    res.status(500).json({ error: 'Failed to deny transaction' });
  }
});

>>>>>>> 9f3e2a4fe62d985e2f3015f2fe8b67f91d42afef
export default router;
