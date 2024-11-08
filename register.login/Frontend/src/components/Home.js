// src/components/Home.js
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/components.css";  // Ensure you have this CSS for styling

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    // Future logic to verify login status, if required
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/logout", {}, { withCredentials: true });
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error logging out:", error.response?.data || error.message);
    }
  };

  if (!isLoggedIn) {
    navigate("/login");
  }

  const handleTransaction = () => {
    navigate("/transaction");
  };

  return (
    <div className="home-container">
      <div className="home-content shadow-lg">
        <h1>Welcome to the Payments Portal</h1>
        <button className="btn btn-primary" onClick={handleTransaction}>Make a Transaction</button>
        <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
