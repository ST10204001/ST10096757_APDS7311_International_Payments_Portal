// src/components/Transaction.js
import "./styles/components.css";  // Ensure you have this CSS for styling
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Transaction = () => {
let navigate = useNavigate();
const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('');
    const [paymentProvider, setPaymentProvider] = useState('');

  const handleTransactionSubmit = async (event) => {
    event.preventDefault();
    // Process the transaction here (e.g., send details to your backend)
    // this is for the approved transaction, to show transaction details
    const transactionDetails = {
                amount,
                currency,
                paymentProvider,
                transactionId: 'TXN1234567890', // Ideally, this would be generated dynamically
                date: new Date().toLocaleDateString(),
    };
    
    // After processing, navigate to the Approved Transaction screen
    navigate('/approved-transaction');
  };

  return (
    <div className="transaction-container">
      <div className="transaction-content shadow-lg">
        <h1>Transaction</h1>
        <form>
          <div className="form-group">
            <label>Amount:</label>
            <input type="number" required className="form-control" placeholder="Enter amount" />
          </div>
          <div className="form-group">
            <label>Currency:</label>
            <select required className="form-control">
              <option value="" disabled selected>Select Currency</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
              <option value="ZAR">ZAR</option>
            </select>
          </div>
          <div className="form-group">
            <label>Payment Provider:</label>
            <select required className="form-control">
              <option value="" disabled selected>Select Payment Provider</option>
              <option value="PayPal">PayPal</option>
              <option value="Stripe">Stripe</option>
              <option value="Square">Square</option>
              <option value="Credit Card">Credit Card</option>
              <option value="SWIFT">SWIFT</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Pay</button>
        </form>
      </div>
    </div>
  );
};

export default Transaction;
