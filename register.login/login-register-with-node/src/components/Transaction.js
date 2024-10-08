// Transaction.js
//import axios from "axios";
//import { useEffect,useState } from "react";
//import { useNavigate } from 'react-router-dom';

const Transaction=()=>{
    //let redirect = useNavigate();
    //const [isLoggedIn, setIsLoggedIn] = useState(true);
    //const [userName, setUserName]=useState('');
    useEffect(()=>{
     //   checkAuthentication();
    },
    []
    )
     /*const checkAuthentication= async()=>{
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
    }*/

    /*const handleLogout= async()=>{
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
    }*/

      /*if(!isLoggedIn) {
        redirect ("/login");
      }*/

    return(
        <div className="content justify-content-center align-items-center d-flex shadow-lg" id="content">
        <div className="col-md-6 d-flex justify-content-center">
            <form>
                <h1>Transaction</h1>
                <div className="form-group">
                    <label>Amount:</label>
                    <input type="number" required className="form-control" />
                </div>
                <br />
                <div className="form-group">
                    <label>Currency:</label>
                    <select required className="form-control">
                        <option value="" disabled selected>Select Currency</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="JPY">JPY</option>
                        <option value="ZAR">ZAR</option>
                    </select>
                </div>
                <br />
                <div className="form-group">
                    <label>Payment Provider:</label>
                    <select required className="form-control">
                        <option value="" disabled selected>Select Payment Provider</option>
                        <option value="PayPal">PayPal</option>
                        <option value="Stripe">Stripe</option>
                        <option value="Square">Square</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="SWIFT">SWIFT</option>
                    </select>
                </div>
                <br />
                <button type="submit" className="btn btn-primary">Pay</button>
                <br />
            </form>
        </div>
    </div>
    
    
    )
}

export default Transaction;