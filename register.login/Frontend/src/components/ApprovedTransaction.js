// ApprovedTransaction.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ApprovedTransaction = () => {
    let navigate = useNavigate();

    const handleHomeRedirect = () => {
        navigate('/home');
    };

    return (
        <div className="content justify-content-center align-items-center d-flex shadow-lg" id="content">
            <div className="col-md-6 d-flex justify-cintent-center">
                <div>
                    <h1>Transaction Approved!</h1>
                    <p>Your transaction has been successfully processed.</p>
                    <button onClick={handleHomeRedirect}>Return to Home</button>
                </div>
            </div>
        </div>
    );
}

export default ApprovedTransaction;
