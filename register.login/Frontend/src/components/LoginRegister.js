import React, { useState } from 'react';
import axios from 'axios';

const LoginRegister = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [error, setError] = useState(null);  // To store error messages

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
            const response = await axios.post('https://localhost:3002/api/register', userData, {
                withCredentials: true,  // Allow sending cookies with requests

            });
            console.log('Registration success:', response.data);
            // Handle successful registration, maybe redirect user or show a success message
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.response ? err.response.data.error : 'Something went wrong');
        }
    };

    // Login handler
    const handleLogin = async (e) => {
        e.preventDefault();

        const loginData = {
            username,
            password,
            accountNumber,
        };

        try {
            const response = await axios.post('https://localhost:3002/api/login', loginData, {
                withCredentials: true,  // Allow sending cookies with requests
            });
            console.log('Login success:', response.data);
            // Handle successful login, maybe redirect or show a success message
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response ? err.response.data.error : 'Something went wrong');
        }
    };

    // Error message display
    const ErrorMessage = () => {
        if (error) {
            return <div className="alert alert-danger">{error}</div>;
        }
        return null;
    };

    // Switch between Register and Login forms (with DOM manipulation)
    const SwitchContent = (e) => {
        const content = document.getElementById('content');
        const registerBtn = document.getElementById('register');
        const loginBtn = document.getElementById('login');

        // Simplified toggling logic for switching between login/register
        if (e.target.id === 'login') {
            content.classList.remove("active");
        } else if (e.target.id === 'register') {
            content.classList.add("active");
        }
    };

    return (
        <div className="content justify-content-center align-items-center d-flex shadow-lg" id="content">
            {/* Registration Form */}
            <div className="col-md-6 d-flex justify-content-center">
                <form onSubmit={handleRegister}>
                    <div className="header-text mb-4">
                        <h1>Register for Online Banking</h1>
                    </div>

                    <div className="input-group mb-3">
                        <input
                            className="form-control form-control-lg bg-light fs-6"
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group mb-3">
                        <input
                            className="form-control form-control-lg bg-light fs-6"
                            type="text"
                            name="userFirstName"
                            placeholder="First Name"
                            value={userFirstName}
                            onChange={(e) => setUserFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group mb-3">
                        <input
                            className="form-control form-control-lg bg-light fs-6"
                            type="text"
                            name="userLastName"
                            placeholder="Last Name"
                            value={userLastName}
                            onChange={(e) => setUserLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group mb-3">
                        <input
                            className="form-control form-control-lg bg-light fs-6"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group mb-3">
                        <input
                            className="form-control form-control-lg bg-light fs-6"
                            type="text"
                            name="idNumber"
                            placeholder="ID Number"
                            value={idNumber}
                            onChange={(e) => setIdNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group mb-3">
                        <input
                            className="form-control form-control-lg bg-light fs-6"
                            type="text"
                            name="accountNumber"
                            placeholder="Account Number"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            required
                        />
                    </div>

                    {/* Error message */}
                    <ErrorMessage />

                    <div className="input-group mb-5 d-flex justify-content-center">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                name="terms"
                                value="checked"
                                className="form-check-input"
                                required
                            />
                            <label htmlFor="formcheck" className="form-check-label text-secondary">
                                <small> I agree to the Terms and Service that my data will be taken and sold. </small>
                            </label>
                        </div>
                    </div>

                    <div className="input-group mb-3 justify-content-center">
                        <button className="btn border-whote text-white w-50 fs-6" type="submit">
                            Register
                        </button>
                    </div>
                </form>
            </div>

            {/* Login Form */}
            <div className="col-md-6 right-box">
                <form onSubmit={handleLogin}>
                    <div className="header-text mb-4">
                        <h1>Login</h1>
                    </div>

                    <div className="input-group mb-3">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group mb-3">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group mb-3">
                        <input
                            type="text"
                            name="accountNumber"
                            placeholder="Account number"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            required
                        />
                    </div>

                    {/* Error message */}
                    <ErrorMessage />

                    <div className="input-group mb-3 justify-content-center">
                        <button className="btn border-whote text-white w-50 fs-6" type="submit">
                            Login
                        </button>
                    </div>
                </form>
            </div>

            {/* Switch Panel */}
            <div className="switch-content">
                <div className="switch">
                    <div className="switch-panel switch-left">
                        <h1>Hello, Again</h1>
                        <p>We are happy to see you back</p>
                        <button
                            className="hidden btn border-white text-white w-50 fs-6"
                            id="login"
                            onClick={SwitchContent}
                        >
                            Login
                        </button>
                    </div>
                    <div className="switch-panel switch-right">
                        <h1>Welcome</h1>
                        <p>Join us today to experience secure, seamless banking services tailored to your global needs.</p>
                        <button
                            className="hidden btn border-white text-white w-50 fs-6"
                            id="register"
                            onClick={SwitchContent}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginRegister;
