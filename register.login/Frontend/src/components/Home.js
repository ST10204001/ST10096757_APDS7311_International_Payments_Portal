import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";
import "./styles/Home.css"; // or "./styles/components.css"


const Home = () => {
  const location = useLocation();
  const isEmployee = location.state?.isEmployee;
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState('John Doe'); // Sample user name
  const [balance, setBalance] = useState('$10,000.00');
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [userRole, setUserRole] = useState(null);  // Define userRole state here

  useEffect(() => {

      // Function to set user role based on isEmployee variable
      const setRoleBasedOnEmployeeStatus = () => {
        if (isEmployee) {
          setUserRole("employee"); // Set role to 'employee' if isEmployee is true
        } else {
          setUserRole("user");
        }
      };

        // Call the role-setting function
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
  }, [isEmployee]);  // Re-run the effect if isEmployee changes


  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/logout", {}, { withCredentials: true });
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error logging out:", error.response?.data || error.message);
    }
  };

  const handleTransaction = () => {
    navigate("/transaction");
  };

  const navigateToProfile = () => {
    navigate("/profile");  // Navigate to the profile route
  };

  if (!isLoggedIn) {
    navigate("/");
  }

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-content shadow-lg">
        {/* Top Header with User's Name and Profile Button */}
        <div className="home-top-header">
          <div className="header-left">
            <h2>Welcome, {userName}!</h2>
          </div>
          <div className="header-right">
            <button className="btn-profile" onClick={navigateToProfile}>
              Profile
            </button>
          </div>
        </div>
        
        {/* Account Summary Centered at the Top */}
        <div className="account-summary">
          <h3>Account Summary</h3>
          <p><strong>Balance:</strong> {balance}</p>
          <p><strong>Pending Transactions:</strong> 69</p>
        </div>

        {/* Main Content Section with Recent Transactions and Alerts */}
        <div className="main-content-boxes">
          <div className="transactions-box">
            <h2>Recent Transactions</h2>
            <ul>
              {recentTransactions.map(tx => (
                <li key={tx.id} className="transaction-card">
                  <h3 className="transaction-recipient">{tx.recipient}</h3>
                  <div className="transaction-details">
                    <div className="transaction-item">
                      <span className="label">Recipient:</span>
                      <span>{tx.recipient}</span>
                    </div>
                    <div className="transaction-item">
                      <span className="label">Amount:</span>
                      <span>{tx.amount}</span>
                    </div>
                    <div className="transaction-item">
                      <span className="label">Status:</span>
                      <span>{tx.status}</span>
                    </div>
                    <div className="transaction-item">
                      <span className="label">Date:</span>
                      <span>{tx.date}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="alerts-box">
            <h3>Alerts</h3>
            <ul>
              {alerts.map(alert => (
                <li key={alert.id}>
                  <p>{alert.message}</p>
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
