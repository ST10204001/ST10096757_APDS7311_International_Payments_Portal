import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './styles/Transaction.css';

const Transaction = () => {
  const [userToSendTo, setUserToSendTo] = useState('');
  const [userAccount, setUserAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [provider, setProvider] = useState('');
  const [swiftCode, setSwiftCode] = useState(''); // New state for SWIFT code

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transactionData = {
      userToSendTo,
      userAccount,
      amount,
      currency,
      provider,
      swiftCode: provider === 'SWIFT' ? swiftCode : null, // Include SWIFT code only if provider is SWIFT
    };
  
    try {
      const response = await fetch('/api/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
        credentials: 'include',
      });
  
      // Check if response is JSON
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        if (response.ok) {
          alert('Transaction successful!');
          setUserToSendTo('');
          setUserAccount('');
          setAmount('');
          setCurrency('');
          setProvider('');
          setSwiftCode('');
        } else {
          alert(`Transaction failed: ${data.error || 'Please try again.'}`);
        }
      } else {
        // Handle non-JSON response
        const text = await response.text();
        console.error('Received non-JSON response:', text);
        alert('Transaction failed due to server error. Please try again.');
      }
    } catch (error) {
      alert('Transaction failed. Please try again.');
      console.error('Transaction error:', error);
    }
  };

  return (
    <div className="transaction-container">
      <Navbar/>
      <div className="transaction-content shadow-lg">
        <h1>New Transaction</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Recipient Name:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Recipient name"
                value={userToSendTo}
                onChange={(e) => setUserToSendTo(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Current User Account:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Your account confirmation"
                value={userAccount}
                onChange={(e) => setUserAccount(e.target.value)}
                required
              />
            </div>
          </div>

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

          {provider === 'SWIFT' && (
            <div className="form-group">
              <label>SWIFT Code:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter SWIFT code"
                value={swiftCode}
                onChange={(e) => setSwiftCode(e.target.value)}
                required
              />
            </div>
          )}

          <button type="submit" className="btn btn-primary">
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Transaction;
