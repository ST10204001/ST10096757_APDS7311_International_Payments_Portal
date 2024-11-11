// src/components/PendingTransaction.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';                    //for the date 

const PendingTransaction = () => {
    const location = useLocation();
    const { transaction } = location.state || {};
    const navigate = useNavigate();
    const [isVerified, setIsVerified] = useState(false);

    const verifySwiftCode = () => {
        // Implement SWIFT code verification logic here
        // For demonstration, we'll assume the SWIFT code is always correct
        if (transaction.swiftCode) {
            setIsVerified(true);
            alert('SWIFT code verified!');
        } else {
            setIsVerified(false);
            alert('Invalid SWIFT code!');
        }
    };

    const submitToSwift = async () => {
        if (!isVerified) {
            alert('Please verify the SWIFT code before submitting.');
            return;
        }

        try {
            // Implement submission logic here
            // For example, you could send a request to a backend endpoint for submission
            await axios.post(`/api/transactions/submit/${transaction._id}`);
            alert('Transaction submitted to SWIFT!');
            navigate('/pending-transactions-list'); // Go back to the transactions list
        } catch (error) {
            console.error('Error submitting transaction:', error);
            alert('Failed to submit transaction. Please try again.');
        }
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
                            <p><strong>Sender Account:</strong> {transaction.userAccount}</p> {/* Display sender's account number */} 
                            <p><strong>Recipient:</strong> {transaction.userToSendTo}</p> {/* Display recipient's name */}
                            <p><strong>Date:</strong> {moment(transaction.createdAt).format('YYYY-MM-DD HH:mm')}</p> 
                            <p><strong>SWIFT Code:</strong> {transaction.swiftCode}</p>
                            <button onClick={verifySwiftCode} className="btn btn-info">Verify SWIFT Code</button>
                            <br />
                            <button onClick={submitToSwift} className="btn btn-success" disabled={!isVerified}>Submit to SWIFT</button>
                        </>
                    ) : (
                        <div>
                            <p>No transaction details available.</p>
                            <button onClick={() => navigate('/home')} className="btn btn-primary" aria-label="Return to Home">Return to Home</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PendingTransaction;
