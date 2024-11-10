import express from 'express';
import Transaction from '../models/Transaction.js'; 
import User from '../models/User.js';  // Import the User model
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect the /transaction route with authentication middleware
// src/routes/transaction.js
router.post('/transaction', authMiddleware, async (req, res) => {
  const { userToSendTo, userAccount, amount, currency, provider} = req.body;

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
     // status: 'pending',
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

// Endpoint to submit transaction to SWIFT 
router.post('/transactions/submit/:id', authMiddleware, async (req, res) => { 
  try { 
    const transactionId = req.params.id; 
    // Implement submission logic here (e.g., update database, send to SWIFT API, etc.) 
    res.json({ message: 'Transaction submitted to SWIFT!' }); 
  } catch (error) { 
    console.error('Error submitting transaction:', error); 
    res.status(500).json({ error: 'Failed to submit transaction to SWIFT' }); 
  } 
});


export default router;
