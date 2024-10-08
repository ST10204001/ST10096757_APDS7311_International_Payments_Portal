// LoginRegister.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
    const [username,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const [userFirstName,setUserFirstName]=useState('');
    const [userLastName,setUserLastName]=useState('');
    const [idNumber,setIdNumber]=useState('');
    const [accountNumber,setAccountNumber]=useState('');

    let redirect = useNavigate();

     /*----------------------------- Register Function ----------------------------------*/
    const handleRegister = async (event)=>{
        event.preventDefault(); // Prevent the default form submission behavior

        const data = {
            username, 
            userFirstName,
            userLastName,
            password,
            idNumber,
            accountNumber,
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

     /*----------------------------- Login Function ----------------------------------*/
    const handleLogin = async (event)=>{
      event.preventDefault(); // Prevent the form from reloading the page

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
              if(res.status===200){
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

     /*----------------------------- Switch Control ----------------------------------*/
   function SwitchContent(){
    const content = document.getElementById('content');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    registerBtn.addEventListener('click', ()=>{
        content.classList.add("active")
    })

    loginBtn.addEventListener('click', ()=>{
        content.classList.add("active")
    })

  }

     /*----------------------------- Frontend Code ----------------------------------*/
    return (
        <div className="content justify-content-center align-items-center d-flex shadow-lg" id="content">
          {/*----------------------------- Register Form ----------------------------------*/}
          <div className="col-md-6 d-flex justify-cintent-center">
            <form>
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
                    placeholder="First name"
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
                    placeholder="Last name"
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
                    placeholder="ID number"
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
                    placeholder="Account number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    required
                  />
                </div>
      
                <div className="input-group mb-5 d-flex justify-content-center">
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="terms"
                    value="checked"
                    className="form-check-input"
                    required
                  />
                    <label htmlFor='formcheck' className="form-check-label text-secondary">
                    <small> I agree to the Terms and Service that my data will be taken and sold.  </small>
                    </label>    
                  </div>
                </div>
      
                <div className="input-group mb-3 justify-content-center"> 
                  <button
                    className="btn border-whote text-white w-50 fs-6"
                    onClick={handleRegister}
                  >
                    Register
                  </button>
                </div>
            </form>
          </div>

          {/*----------------------------- Login Form ----------------------------------*/}
      
         <div className="col-md-6 right-box">
          <form>
            <div className="header-text mb-4">
            <h1>Login</h1>
            </div>

          <div className="input-group mb-3">
          <input 
          type='text' 
          name='username' 
          placeholder="Username"
          value={username} 
          onChange={(e) => setUserName(e.target.value)} />
          </div>


          <div className="input-group mb-3">
          <input 
          type='password' 
          name='password' 
          placeholder="Password"
          value={password} 
          onChange={(e) => setPassword(e.target.value)} />
          </div> 

          <div className="input-group mb-3">
                  <input 
                  type="text" 
                  name="accountNumber" 
                  placeholder="Account number"
                  value={accountNumber} 
                  onChange={(e) => setAccountNumber(e.target.value)} 
                  required />
          </div>

          <div className="input-group mb-3 justify-content-center"> 
              <button
                  className="btn border-whote text-white w-50 fs-6"
                  type="submit" onClick={handleLogin}>
                      Login
              </button>
          </div>
          </form>
          </div>

          {/*----------------------------- Switch Panel ----------------------------------*/}     
          <div className="switch-content">
            <div className="switch">
              <div className="switch-panel switch-left">
                <h1>Hello, Again</h1>
                <p>We are happy to see you back</p>
                <button className='hidden btn border-white text-white w-50 fs-6' id="login" onClick={SwitchContent}>Login</button>
              </div>
              <div className="switch-panel switch-right">
                <h1>Welcome</h1>
                <p> Join us today to experience secure, seamless banking services tailored to your global needs.</p>
                <button className='hidden btn border-white text-white w-50 fs-6' id='register' onClick={SwitchContent}>Register</button>
              </div>
            </div>
          </div>

        </div>
      );
      
}

export default LoginRegister;
