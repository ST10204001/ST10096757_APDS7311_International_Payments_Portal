// src/components/PendingTransaction.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PendingTransaction = () => {
    let navigate = useNavigate();
    const location = useLocation();
    const { transaction } = location.state || {};

    const handleApprove = () => {
        // Process the approval here (e.g., send approval to your backend)
        alert('Transaction Approved!');
        navigate('/approved-transaction', { state: { transaction } });
    };

    const handleDeny = () => {
        // Process the denial here (e.g., send denial to your backend)
        alert('Transaction Denied!');
    };

    return (
        <div className="content justify-content-center align-items-center d-flex shadow-lg" id="content">
            <div className="col-md-6 d-flex justify-content-center">
                <div>
                    <h1>Review Transaction</h1>
                    {transaction ? (
                        <>
                            <p><strong>Transaction ID:</strong> {transaction.transactionId}</p>
                            <p><strong>Amount:</strong> ${transaction.amount}</p>
                            <p><strong>Currency:</strong> {transaction.currency}</p>
                            <p><strong>Payment Provider:</strong> {transaction.paymentProvider}</p>
                            <p><strong>Date:</strong> {transaction.date}</p>
                            <button onClick={handleApprove} className="btn btn-success">Approve</button>
                            <button onClick={handleDeny} className="btn btn-danger">Deny</button>
                        </>
                    ) : (
                        <p>No transaction details available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PendingTransaction;

