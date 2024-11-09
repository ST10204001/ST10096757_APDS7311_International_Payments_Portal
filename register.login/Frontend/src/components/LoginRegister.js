import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const LoginRegister = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [isEmployee, setIsEmployee] = useState(false); // State for employee toggle
    const [error, setError] = useState(null);  // To store error messages
    const [successMessage, setSuccessMessage] = useState(null);  // To store success messages
    const [isLogin, setIsLogin] = useState(true); // For toggling between login/register forms

    const navigate = useNavigate(); 

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
    
        if (isEmployee) {
            // If employee, prevent registration and show a message
            setError('Employees cannot register through this form. Please contact an admin.');
            return;
        }

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

                // Navigate to the login form after successful registration
                setTimeout(() => {
                    setIsLogin(true);
                    navigate('/');
                }, 2000); // Optional delay for displaying success message

        } catch (err) {
            console.error('Registration error:', err);
            setError(err.message || 'Something went wrong');
            setSuccessMessage(null);
        }
    };

    // Login handler
    const handleLogin = async (e) => {
        e.preventDefault();

        const loginData = {
            username,
            password,
            isEmployee,  // Pass the employee status
        };

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
                credentials: 'include', // Allow cookies to be sent
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json(); // Parse JSON response
            console.log('Login success:', responseData);
            setSuccessMessage('Login successful');
            setError(null);

            // Redirect to the home page after successful login
            navigate('/home');
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message || 'Something went wrong');
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
                <div className="shadow-lg p-4" style={{ maxWidth: '600px', width: '100%' }}>
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

                        {/* Account Number (Only for regular users) */}
                        {!isEmployee && (
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
                        )}

                        {/* Employee Login Option (Only on Login Form) */}
                        {isLogin && (
                            <div className="form-group mb-3">
                                <label>Login as: </label>
                                <div>
                                    <input
                                        type="radio"
                                        id="user"
                                        name="userType"
                                        value="user"
                                        checked={!isEmployee}
                                        onChange={() => setIsEmployee(false)}
                                    />
                                    <label htmlFor="user">Regular User</label>

                                    <input
                                        type="radio"
                                        id="employee"
                                        name="userType"
                                        value="employee"
                                        checked={isEmployee}
                                        onChange={() => setIsEmployee(true)}
                                    />
                                    <label htmlFor="employee">Employee</label>
                                </div>
                            </div>
                        )}

                        {/* Additional fields for registration only */}
                        {!isLogin && !isEmployee && (
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
                            </>
                        )}

                        {/* Message for employees on the register page */}
                        {!isLogin && isEmployee && (
                            <div className="alert alert-info">
                                Employees cannot register through this form. Please contact an admin.
                            </div>
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
