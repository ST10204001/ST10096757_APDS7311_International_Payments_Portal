// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const [userFirstName,setUserFirstName]=useState('');
    const [userLastName,setUserLastName]=useState('');
    const [idNumber,setIdNumber]=useState('');
    const [accountNumber,setAccountNumber]=useState('');

    let redirect = useNavigate();
    

    const handleRegister = async (event)=>{
        event.preventDefault(); // Prevent the default form submission behavior

        const data = {
            username, // Correct casing
            userFirstName,
            userLastName,
            password,
            idNumber,
            accountNumber
        }

     
    try {
        const response = await axios.post('http://localhost:3000/api/register', data);

        // Check if the response contains the success message
        if (response.data.message) {
            alert(response.data.message); // Show success message
            redirect('/login');
        }
    } catch (error) {
        console.log('Error details:', error); // Log the error to see the structure
        if (error.response && error.response.data && error.response.data.error) {
            // Show the specific error message from the backend
            alert(error.response.data.error);
        } else {
            // General error handling
            alert('An error occurred during registration.');
        }
    }
            
    }

    return (
        <div>
            <h1>Register</h1>
            <form>
                <label>
                    Username: 
                    <input 
                    type="text" 
                    name="username" 
                    value={username}  
                    onChange={(e) => setUserName(e.target.value)}
                    required/>
                </label>
                <br />
                <label>
                    First Name: 
                    <input 
                    type="text" 
                    name="userFirstName" 
                    value={userFirstName}  
                    onChange={(e) => setUserFirstName(e.target.value)}
                    required/>
                </label>
                <br />
                <label>
                    Last Name: 
                    <input 
                    type="text" 
                    name="userLastName" 
                    value={userLastName}  
                    onChange={(e) => setUserLastName(e.target.value)}
                    required/>
                </label>
                <br />
                <label>
                    Password: 
                    <input 
                    type="password" 
                    name="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}  
                    required/>
                </label>
                <br />
                <label>
                    ID Number: 
                    <input 
                    type="text" 
                    name="idNumber" 
                    value={idNumber} 
                    onChange={(e) => setIdNumber(e.target.value)} 
                    required />
                </label>
                <br />
                <label>
                Account Number: 
                    <input 
                    type="text" 
                    name="accountNumber" 
                    value={accountNumber} 
                    onChange={(e) => setAccountNumber(e.target.value)} 
                    required />
                </label>
                <br />
                <button type="submit" onClick={handleRegister}>Register</button>
            </form>
        </div>
    );
}

export default Register;
