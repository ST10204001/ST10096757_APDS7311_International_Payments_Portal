// Register.js
import React from 'react';

const Register = () => {
    return (
        <div>
            <h1>Register</h1>
            {/* You can add your registration form or other content here */}
            <form>
                <label>
                    Username:
                    <input type="text" name="username" />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" />
                </label>
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
