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
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);  // Store username in local state
  const { user, balance, transactions, setUser } = useContext(UserContext);

  useEffect(() => {
    const setRoleBasedOnEmployeeStatus = () => {
      if (isEmployee) {
        setUserRole("employee");
      } else {
        setUserRole("user");
      }
    };

    setRoleBasedOnEmployeeStatus();
  }, [isEmployee]);

  useEffect(() => {
    // Fetch the current user details from the backend
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/current-user', { withCredentials: true });
        setUsername(response.data.username); // Set the username
        setLoading(false);  // Data is now loaded, stop loading
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(true);  // Stay in loading state if there is an error
      }
    };

    fetchCurrentUser();
  }, []);

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

  //if (!loading) return <div>Loading...</div>;

  return (
    <div className="home-container">
      <Navbar />
      
      <div className="home-content shadow-lg">
        {/* Banner Section - Displaying Username */}
        {user && (
          <div className="home-top-header">
            <div className="header-left">
              {/* Display the logged-in username */}
              <h2>Welcome, {username || 'Guest'}!</h2>
            </div>
            <div className="header-right">
              <button className="btn-profile" onClick={() => navigate('/profile')}>
                Profile
              </button>
            </div>
          </div>
        )}

        {/* Account Summary Section */}
        <div className="account-summary">
          <h3>Account Summary</h3>
          <p><strong>Balance:</strong> {balance ? `$${balance.toFixed(2)}` : '$0.00'}</p>
          <p><strong>Pending Transactions:</strong> {transactions?.length || 0}</p>
        </div>

        <div className="main-content-boxes">
          <div className="transactions-box">
            <h2>Recent Transactions</h2>
            <ul>
              {transactions && transactions.length > 0 ? (
                transactions.map(tx => (
                  <li key={tx.id} className="transaction-card">
                    <h3 className="transaction-recipient">{tx.recipient}</h3>
                    <div className="transaction-details">
                      <div className="transaction-item"><span className="label">Recipient:</span> <span>{tx.recipient}</span></div>
                      <div className="transaction-item"><span className="label">Amount:</span> <span>{tx.amount}</span></div>
                      <div className="transaction-item"><span className="label">Status:</span> <span>{tx.status}</span></div>
                      <div className="transaction-item"><span className="label">Date:</span> <span>{tx.date}</span></div>
                    </div>
                  </li>
                ))
              ) : (
                <p>No recent transactions available.</p>
              )}
            </ul>
          </div>
        </div>

        {/* Approve user transactions*/}
        {userRole === 'employee' && (
          <button className="btn btn-primary" onClick={() => navigate("/pending-transactions-list")}>
            Pending Transactions List
          </button>
        )}
      {/* Button to navigate to transaction page */} 
      <button className="btn btn-secondary" onClick={handleTransaction}> Create New Transaction </button>
      </div> 
    </div>
  ); };
export default Home;