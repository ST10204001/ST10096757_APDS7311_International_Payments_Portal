// src/components/Home.js
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";
import "./styles/Home.css"; 

const Home = () => {
    const [userName, setUserName] = useState('John Doe'); // Sample user name
    const [balance, setBalance] = useState('$10,000.00');
    const [recentTransactions, setRecentTransactions] = useState([]);
    const [alerts, setAlerts] = useState([]);

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        // Simulated fetch for transactions and alerts
        const fetchTransactions = async () => {
            setRecentTransactions([
                { id: 1, amount: '$200', status: 'Completed', date: '2024-11-01' },
                { id: 2, amount: '$500', status: 'Pending', date: '2024-11-05' },
                { id: 3, amount: '$300', status: 'Failed', date: '2024-11-06' }
            ]);

            setAlerts([
                { id: 1, message: 'Password will expire in 3 days.' },
                { id: 2, message: 'Unusual login activity detected.' }
            ]);
        };
        fetchTransactions();
    }, []);

    const handleTransactionSearch = (event) => {
        event.preventDefault();
        alert("Search functionality is under development!");
    };

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:3000/api/logout", {}, { withCredentials: true });
            setIsLoggedIn(false);
        } catch (error) {
            console.error("Error logging out:", error.response?.data || error.message);
        }
    };

    if (!isLoggedIn) {
        alert("You have been logged out.");
        navigate("/login");
    }

    return (
        <div className="home-container">
            <Navbar/>

            <div className="home-content">

                {/* Top Header with User's Name and Profile Button */}
                <div class="home-top-header">
                  <div class="header-left">
                      <h2>Welcome, John Doe!</h2>
                  </div>
                  <div class="header-right">
                      <button class="btn-profile">Profile</button>
                  </div>
              </div>
                {/* Account Summary Centered at the Top */}
                <div className="account-summary">
                    <h3>Account Summary</h3>
                    <p><strong>Balance:</strong> {balance}</p>
                    <p><strong>Pending Transactions:</strong> 69</p>
                </div>

                {/* Search Bar Full Width */}
                <form className="search-bar" onSubmit={handleTransactionSearch}>
                    <input type="text" placeholder="Search transactions, accounts..." />
                    <button type="submit">Search</button>
                </form>

                {/* Main Content Section with Recent Transactions and Alerts */}
                <div className="main-content-boxes">
                    <div className="transactions-box">
                        <h3>Recent Transactions</h3>
                        <ul>
                            {recentTransactions.map(tx => (
                                <li key={tx.id}>
                                    <p><strong>Amount:</strong> {tx.amount}</p>
                                    <p><strong>Status:</strong> {tx.status}</p>
                                    <p><strong>Date:</strong> {tx.date}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="alerts-box">
                        <h3>Alerts & Notifications</h3>
                        <ul>
                            {alerts.map(alert => (
                                <li key={alert.id}>{alert.message}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
