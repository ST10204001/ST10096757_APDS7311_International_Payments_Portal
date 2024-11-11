// src/components/PendingTransactionList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';                    //for the date 

const PendingTransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the list of transactions from the backend
        axios.get('/api/transactions') // Ensure this endpoint matches the backend
            .then(response => {
                console.log('Transactions fetched:', response.data); // Debugging: log the response data
                setTransactions(response.data);
            })
            .catch(error => console.error('Error fetching transactions:', error));
    }, []);

    const handleTransactionClick = (transaction) => {
        // Navigate to the transaction detail page with the transaction data
        navigate('/pending-transaction-details', { state: { transaction } });
    };

    return (
        <div className="content justify-content-center align-items-center d-flex shadow-lg" id="content">
            <div className="col-md-8">
                <h1>Transactions</h1>
                {transactions.length > 0 ? (
                    transactions.map(transaction => (
                        <div key={transaction._id} className="transaction-item" onClick={() => handleTransactionClick(transaction)}>
                            <p><strong>Transaction ID:</strong> {transaction._id}</p>
                            <p><strong>Amount:</strong> ${transaction.amount}</p>
                            <p><strong>Currency:</strong> {transaction.currency}</p>
                            <p><strong>Payment Provider:</strong> {transaction.provider}</p>
                              {/* Conditionally render SWIFT Code if provider is SWIFT */}
                              {transaction.provider === "SWIFT" && (
                                <p><strong>SWIFT Code:</strong> {transaction.swiftCode}</p>
                            )}
                            <p><strong>Date:</strong> {moment(transaction.createdAt).format('YYYY-MM-DD HH:mm')}</p> 
                            <hr />
                        </div>
                    ))
                ) : (
                    <div>
                        <p>No transactions available.</p>
                        <button onClick={() => navigate('/home')} className="btn btn-primary" aria-label="Return to Home">Return to Home</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PendingTransactionList;



