// Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const [userFirstName,setUserFirstName]=useState('');
    const [userLastName,setUserLastName]=useState('');
    const [idNumber,setIdNumber]=useState('');
    const [accountNumber,setAccountNumber]=useState('');
    

    const handleRegister = async (event)=>{
        event.preventDefault(); // Prevent the default form submission behavior

        const data = {
            userName:username,     
            userFirstName: userFirstName,
            userLastName: userLastName,
            password:password,
            idNumber: idNumber,
            accountNumber: accountNumber
        }
        try{
            await axios.post('http://localhost:3000/api/register',data);
            console.log('Registered Successfully');
            alert('Registered Successfully');
    
        }
        catch(error){
            console.log('There is something wrong in registration',error);
            alert('Registration Failed');
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
