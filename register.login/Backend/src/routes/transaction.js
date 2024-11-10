import express from 'express';
import Transaction from '../models/Transaction.js'; 
import User from '../models/User.js';  // Import the User model
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect the /transaction route with authentication middleware
// src/routes/transaction.js
router.post('/transaction', authMiddleware, async (req, res) => {
  const { userToSendTo, userAccount, amount, currency, provider } = req.body;

  try {
    const userId = req.session.user.id;  // Get the logged-in user ID from session
    const userAccountNumber = req.session.user.accountNumber;  // Get the stored account number from the session

    console.log('Logged-in User ID:', userId);
    console.log('Entered Account Number:', userAccount);
    console.log('Stored Account Number:', userAccountNumber);

    // Validate that the entered account number matches the stored account number in the session
    if (userAccount !== userAccountNumber) {
      console.log(`Account number mismatch: ${userAccount} !== ${userAccountNumber}`);
      return res.status(400).json({ error: 'Account number does not match your registered account.' });
    }

    // Proceed with creating the transaction if validation passes
    const transaction = new Transaction({
      user: userId,
      userToSendTo,
      userAccount,
      amount,
      currency,
      provider,
      status: 'pending',
    });

    await transaction.save();

    res.status(200).json({ message: 'Transaction successful!' });
  } catch (error) {
    console.error('Transaction error:', error);
    res.status(500).json({ error: 'Transaction failed. Please try again.' });
  }
});


//endpoint to fetch all transactions 
router.get('/transactions', authMiddleware, async (req, res) => {
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


export default router;
