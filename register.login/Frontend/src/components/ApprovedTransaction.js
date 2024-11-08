// ApprovedTransaction.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ApprovedTransaction = () => {
    let navigate = useNavigate();
    const location = useLocation();
    const { transaction } = location.state || {};

    const handleHomeRedirect = () => {
        navigate('/home');
    };

  return (
          <div className="content justify-content-center align-items-center d-flex shadow-lg" id="content">
              <div className="col-md-6 d-flex justify-content-center">
                  <div>
                      <h1>Transaction Approved!</h1>
                      <p>Your transaction has been successfully processed.</p>
                      {transaction && (
                          <>
                              <p><strong>Transaction ID:</strong> {transaction.transactionId}</p>
                              <p><strong>Amount:</strong> ${transaction.amount}</p>
                              <p><strong>Currency:</strong> {transaction.currency}</p>
                              <p><strong>Payment Provider:</strong> {transaction.paymentProvider}</p>
                              <p><strong>Date:</strong> {transaction.date}</p>
                          </>
                      )}
                      <button onClick={handleHomeRedirect}>Return to Home</button>
                  </div>
              </div>
          </div>
      );
  }
  
  export default ApprovedTransaction;