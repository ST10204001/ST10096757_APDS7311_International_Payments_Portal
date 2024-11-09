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

    const navigateToProfile = () => {
        navigate("/profile");  // Navigate to the profile route
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

                </div>
            </div>
        </div>
    );
};

export default Home;
