import React, { useState } from 'react';
import axios from 'axios';  // Axios for HTTP requests

const LoginRegister = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [error, setError] = useState(null);  // To store error messages
    const [successMessage, setSuccessMessage] = useState(null);  // To store success messages
    const [isLogin, setIsLogin] = useState(true); // For toggling between login/register forms

    // Error message display
    const ErrorMessage = () => {
        if (error) {
            return <div className="alert alert-danger">{error}</div>;
        }
        return null;
    };

    const SuccessMessage = () => {
        if (successMessage) {
            return <div className="alert alert-success">{successMessage}</div>;
        }
        return null;
    };

    // Registration handler
    const handleRegister = async (e) => {
        e.preventDefault();
    
        const userData = {
            username,
            password,
            userFirstName,
            userLastName,
            idNumber,
            accountNumber,
        };

        try {
            // Send the registration data to the backend API
            const response = await fetch('/api/register', {  // Use the relative path
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
                credentials: 'include', // Allow cookies to be sent
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json(); // Parse JSON response
            console.log('Registration success:', responseData);
            setSuccessMessage(responseData.message);
            setError(null);
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.message || 'Something went wrong');
            setSuccessMessage(null);
        }
    };

    // Login handler with Axios
    const handleLogin = async (e) => {
        e.preventDefault();

        const loginData = {
            username,
            password,
        };

        try {
            // Send the registration data to the backend API
            const response = await fetch('/api/login', {  // Use the relative path
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
                credentials: 'include', // Allow cookies to be sent
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log('Login success:', response.data);
            setSuccessMessage('Login successful');
            setError(null);
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response ? err.response.data.error : 'Something went wrong');
            setSuccessMessage(null);
        }
    };

    // Toggle between Login and Register Forms
    const toggleForm = () => {
        setIsLogin(!isLogin);
        setError(null);
        setSuccessMessage(null);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-6 shadow-lg p-4">
                    <h2 className="text-center">{isLogin ? 'Login' : 'Register'}</h2>

                    {/* Display Success/Failure messages */}
                    <SuccessMessage />
                    <ErrorMessage />

                    <form onSubmit={isLogin ? handleLogin : handleRegister}>
                        {/* Username */}
                        <div className="form-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="form-group mb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Additional fields for registration only */}
                        {!isLogin && (
                            <>
                                <div className="form-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="First Name"
                                        value={userFirstName}
                                        onChange={(e) => setUserFirstName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Last Name"
                                        value={userLastName}
                                        onChange={(e) => setUserLastName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="ID Number"
                                        value={idNumber}
                                        onChange={(e) => setIdNumber(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Account Number"
                                        value={accountNumber}
                                        onChange={(e) => setAccountNumber(e.target.value)}
                                        required
                                    />
                                </div>
                            </>
                        )}

                        <div className="form-group text-center">
                            <button className="btn btn-primary w-100" type="submit">
                                {isLogin ? 'Login' : 'Register'}
                            </button>
                        </div>
                    </form>

                    {/* Switch between Login and Register */}
                    <div className="text-center mt-3">
                        <button className="btn btn-link" onClick={toggleForm}>
                            {isLogin ? 'Don\'t have an account? Register' : 'Already have an account? Login'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginRegister;
