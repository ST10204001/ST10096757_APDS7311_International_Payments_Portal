import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import Navbar from './Navbar';
import { UserContext } from '../context/UserContext';

import './styles/Home.css';

const Home = () => {
  const location = useLocation();
  const isEmployee = location.state?.isEmployee;
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [userRole, setUserRole] = useState(null); // Define userRole state here
  const { user, balance, transactions, setUser } = useContext(UserContext);

  useEffect(() => {
    // Function to set user role based on isEmployee variable
    const setRoleBasedOnEmployeeStatus = () => {
      if (isEmployee) {
        setUserRole("employee");
      } else {
        setUserRole("user");
      }
    };

    setRoleBasedOnEmployeeStatus();

    // Simulated fetch for transactions and alerts
    const fetchTransactions = async () => {
      setRecentTransactions([
        { id: 1, recipient: 'Alice', amount: '$200', status: 'Completed', date: '2024-11-01' },
        { id: 2, recipient: 'Bob', amount: '$500', status: 'Pending', date: '2024-11-05' },
        { id: 3, recipient: 'Charlie', amount: '$300', status: 'Failed', date: '2024-11-06' }
      ]);

      setAlerts([
        { id: 1, message: 'Password will expire in 3 days.' },
        { id: 2, message: 'Unusual login activity detected.' }
      ]);
    };

    fetchTransactions();
  }, [isEmployee]);

  //Update this method. Can't access home with this
  // useEffect(() => {
  //   if (!user) {
  //     navigate('/'); // Redirect to login if not authenticated
  //   }
  // }, [user, navigate]);

  //this don't work either
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

  if (!isLoggedIn) {
    navigate("/");
  }

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

        {/* Conditional Buttons for User or Employee Roles */}
        {userRole === 'user' && (
          <button className="btn btn-primary" onClick={() => navigate("/approved-transaction")}>
            Approved Transactions
          </button>
        )}
        {userRole === 'employee' && (
          <button className="btn btn-primary" onClick={() => navigate("/pending-transaction")}>
            Pending Transactions
          </button>
        )}

        {/* Buttons for Making Transactions and Logging Out */}
        <button className="btn btn-primary" onClick={handleTransaction}>Make a Transaction</button>
        <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
