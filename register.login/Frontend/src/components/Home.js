import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import { UserContext } from '../context/UserContext';

import './styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { user, balance, transactions, setTransactions, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      navigate('/'); // Redirect to login if not authenticated
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/logout", {}, { withCredentials: true });
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleTransaction = () => {
    navigate("/transaction");
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-content shadow-lg">
        <div className="home-top-header">
          <div className="header-left">
            <h2>Welcome, {user?.name || 'Guest'}!</h2>
          </div>
          <div className="header-right">
            <button className="btn-profile" onClick={() => navigate('/profile')}>
              Profile
            </button>
          </div>
        </div>

        <div className="account-summary">
          <h3>Account Summary</h3>
          <p><strong>Balance:</strong> {balance || '$0.00'}</p>
          <p><strong>Pending Transactions:</strong> {transactions?.length || 0}</p>
        </div>

        <div className="main-content-boxes">
          <div className="transactions-box">
            <h2>Recent Transactions</h2>
            <ul>
              {transactions?.map(tx => (
                <li key={tx.id} className="transaction-card">
                  <h3 className="transaction-recipient">{tx.recipient}</h3>
                  <div className="transaction-details">
                    <div className="transaction-item">
                      <span className="label">Recipient:</span> <span>{tx.recipient}</span>
                    </div>
                    <div className="transaction-item">
                      <span className="label">Amount:</span> <span>{tx.amount}</span>
                    </div>
                    <div className="transaction-item">
                      <span className="label">Status:</span> <span>{tx.status}</span>
                    </div>
                    <div className="transaction-item">
                      <span className="label">Date:</span> <span>{tx.date}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button className="btn btn-primary" onClick={handleTransaction}>
          Make a Transaction
        </button>
        <button className="btn btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;