// Home.js
import axios from "axios";
import { useEffect,useState } from "react";
import { useNavigate } from 'react-router-dom';

const Home=()=>{
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

    const handleTransaction = async()=>{
        redirect('/transaction');
    }  

    return(
        <div className="content justify-content-center align-items-center d-flex shadow-lg" id="content">
        <div className="col-md-6 d-flex justify-cintent-center">
        <form>
            <h1>Welcome {userName} </h1>
            <br />
            <button onClick={handleTransaction}>Make a transaction</button>
           <br/> 
            <button onClick={handleLogout}>Logout</button>
        </form>
        </div>
        </div>
    )
}

export default Home;