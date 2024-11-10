// src/components/PendingTransaction.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PendingTransaction = () => {
    const location = useLocation();
    const { transaction } = location.state || {};
    const navigate = useNavigate();

    const handleApprove = () => {
        alert('Transaction Approved!');
        navigate('/pending-transactions'); // Go back to the transactions list
    };

    const handleDeny = () => {
        alert('Transaction Denied!');
        navigate('/pending-transactions'); // Go back to the transactions list
    };

    return (
        <div className="content justify-content-center align-items-center d-flex shadow-lg" id="content">
            <div className="col-md-6 d-flex justify-content-center">
                <div>
                    <h1>Review Transaction</h1>
                    {transaction ? (
                        <>
                            <p><strong>Transaction ID:</strong> {transaction._id}</p>
                            <p><strong>Amount:</strong> ${transaction.amount}</p>
                            <p><strong>Currency:</strong> {transaction.currency}</p>
                            <p><strong>Payment Provider:</strong> {transaction.provider}</p>
                            <p><strong>Date:</strong> {transaction.date}</p>
                            <button onClick={handleApprove} className="btn btn-success">Approve</button>
                            <button onClick={handleDeny} className="btn btn-danger">Deny</button>
                        </>
                    ) : (
                        <div>
                        <button onClick={() => navigate('/home')} className="btn btn-primary" aria-label="Return to Home">Return to Home</button>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PendingTransaction;
