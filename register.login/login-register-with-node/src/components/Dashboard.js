// Transaction.js
import axios from "axios";
import { useEffect,useState } from "react";
import { useNavigate } from 'react-router-dom';

const Dashboard=()=>{
    let redirect = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [userName, setUserName]=useState('');
    useEffect(()=>{
        checkAuthentication();
    },
    []
    )
     const checkAuthentication= async()=>{
         try{
            await axios.get('http://localhost:3000/dashboard',{
                withCredentials: true,
        }).then((res)=>{
          setUserName(res.data.userName)
        });
            setIsLoggedIn(true);
         }
         catch(error){
            setIsLoggedIn(false);
         }
    }

    const handleLogout= async()=>{
        try {
            await axios.post('http://localhost:3000/api/logout', {},
            {
              withCredentials: true,
            });
            setIsLoggedIn(false);
            console.log('Logout successful');

        }
        catch(error){
             console.error('Error logging out:', error.response.data);
        }
    }

      if(!isLoggedIn) {
        redirect ("/login");
      }

    return(
        <>
            <h1>Welcome {userName} </h1>
            <br />
            <h2>Transaction</h2>
            <label>Amount:</label>
            <br/>
            <label>Currency:</label>
            <br/> 
            <label>
                Payment Provider: 
            </label>
            <br />
           <button type="submit">Pay</button>
           <br/> 
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Dashboard;