// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login=()=>{
const [username,setUserName]=useState('');
const [password,setPassword]=useState('');
const [accountNumber,setAccountNumber]=useState('');

let redirect = useNavigate();


const handleRegister = async ()=>{
    const data = {
        userName:username,
        password:password,
        accountNumber: accountNumber
    } 

    try{
        await axios.post('http://localhost:3000/api/login', data , {
            withCredentials: true,
    })
        .then((res)=>{
           if(res.status==200){
              redirect('/dashboard');
           }
           else{
             alert('Sorry Invalid Login😭😭');
           }
        })

    }
    catch(error){
         alert('Sorry Invalid Login😭😭');
    }
}

    return(
        <div>
            <h1>Login</h1>
            <label>Username:</label>
            <input 
            type='text' 
            name='username' 
            value={username} 
            onChange={(e) => setUserName(e.target.value)} />
            <br/>
            <label>Password:</label>
            <input 
            type='password' 
            name='password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} />
            <br/> 
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
           <button type="submit" onClick={handleRegister}>Login</button>
        </div>
    )
}

export default Login;