// src/components/PendingTransaction.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PendingTransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the list of pending transactions from the backend
        axios.get('/api/transactions/pending')
            .then(response => setTransactions(response.data))
            .catch(error => console.error('Error fetching transactions:', error));
    }, []);

    const handleApprove = (transaction) => {
        // Process the approval here (e.g., send approval to your backend)
        axios.post(`/api/transactions/approve/${transaction.transactionId}`)
            .then(response => {
                alert('Transaction Approved!');
                // Update the list to remove the approved transaction
                setTransactions(transactions.filter(t => t.transactionId !== transaction.transactionId));
                navigate('/approved-transaction', { state: { transaction } });
            })
            .catch(error => console.error('Error approving transaction:', error));
    };

    const handleDeny = (transaction) => {
        // Process the denial here (e.g., send denial to your backend)
        axios.post(`/api/transactions/deny/${transaction.transactionId}`)
            .then(response => {
                alert('Transaction Denied!');
                // Update the list to remove the denied transaction
                setTransactions(transactions.filter(t => t.transactionId !== transaction.transactionId));
            })
            .catch(error => console.error('Error denying transaction:', error));
    };

    return (
        <div className="content justify-content-center align-items-center d-flex shadow-lg" id="content">
            <div className="col-md-8">
                <h1>Pending Transactions</h1>
                {transactions.length > 0 ? (
                    transactions.map(transaction => (
                        <div key={transaction.transactionId} className="transaction-item">
                            <p><strong>Transaction ID:</strong> {transaction.transactionId}</p>
                            <p><strong>Amount:</strong> ${transaction.amount}</p>
                            <p><strong>Currency:</strong> {transaction.currency}</p>
                            <p><strong>Payment Provider:</strong> {transaction.paymentProvider}</p>
                            <p><strong>Date:</strong> {transaction.date}</p>
                            <button onClick={() => handleApprove(transaction)} className="btn btn-success">Approve</button>
                            <button onClick={() => handleDeny(transaction)} className="btn btn-danger">Deny</button>
                            <hr />
                        </div>
                    ))
                ) : (
                    <p>No pending transactions available.</p>
                )}
            </div>
        </div>
    );
};

export default PendingTransactionList;

