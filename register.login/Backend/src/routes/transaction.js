import express from 'express';
import Transaction from '../models/Transaction.js'; 
import User from '../models/User.js';  // Import the User model
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();


// SWIFT code validation for South African codes
function isValidSouthAfricanSwiftCode(swiftCode) {
  const swiftRegex = /^[A-Z]{4}ZA[A-Z0-9]{2}([A-Z0-9]{3})?$/;
  return swiftRegex.test(swiftCode);
}

// Protect the /transaction route with authentication middleware
// src/routes/transaction.js
router.post('/transaction', authMiddleware, async (req, res) => {
  const { userToSendTo, userAccount, amount, currency, provider, swiftCode } = req.body;

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

   // Validate SWIFT code only if the provider is "SWIFT"
   if (provider === 'SWIFT') {
    if (!swiftCode || !isValidSouthAfricanSwiftCode(swiftCode)) {
      return res.status(400).json({ error: 'Invalid SWIFT code for South Africa.' });
    }
    console.log('Valid SWIFT code:', swiftCode);
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

     // Conditionally add swiftCode only if the provider is "SWIFT"
     if (provider === 'SWIFT') {
      transaction.swiftCode = swiftCode;
    }

    await transaction.save();

    res.status(200).json({ message: 'Transaction successful!' });
  } catch (error) {
    console.error('Transaction error:', error);
    res.status(500).json({ error: 'Transaction failed. Please try again.' });
  }
});


//endpoint to fetch all transactions 
router.get('/transactions/pending', authMiddleware, async (req, res) => { 
  try { 
    const transactions = await Transaction.find({ status: 'pending' }); 
    console.log(transactions); // Log the transactions to check if user details are included 
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
    const transaction = await Transaction.findById(transactionId); 
    if (!transaction) { 
      return res.status(404).json({ error: 'Transaction not found' }); 
    } 
    
    // Update transaction status to 'approved' 
    transaction.status = 'approved'; 
    await transaction.save(); 
    
    res.json({ message: 'Transaction submitted to SWIFT!' }); 
  } catch (error) { 
    console.error('Error submitting transaction:', error); 
    res.status(500).json({ error: 'Failed to submit transaction to SWIFT' }); 
  } 
});

export default router;
