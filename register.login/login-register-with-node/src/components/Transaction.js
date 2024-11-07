// src/components/Transaction.js
import React, { useState } from 'react';
import axios from 'axios';
import './styles/Transaction.css'; 

const Transaction = () => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [provider, setProvider] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transactionData = {
      amount,
      currency,
      provider,
    };

    try {
      const response = await axios.post('https://localhost:3001/api/transaction', transactionData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        alert('Transaction successful!');
        setAmount('');
        setCurrency('');
        setProvider('');
      }
    } catch (error) {
      alert('Transaction failed. Please try again.');
      console.error('Transaction error:', error);
    }
  };

  return (
    <div className="transaction-container">
      <div className="transaction-content shadow-lg">
        <h1>New Transaction</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Amount:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Currency:</label>
            <select
              className="form-control"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              required
            >
              <option value="" disabled>Select Currency</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
              <option value="ZAR">ZAR</option>
            </select>
          </div>

          <div className="form-group">
            <label>Payment Provider:</label>
            <select
              className="form-control"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              required
            >
              <option value="" disabled>Select Provider</option>
              <option value="PayPal">PayPal</option>
              <option value="Stripe">Stripe</option>
              <option value="Square">Square</option>
              <option value="Credit Card">Credit Card</option>
              <option value="SWIFT">SWIFT</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default Transaction;
