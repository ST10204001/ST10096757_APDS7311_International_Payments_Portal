import React from 'react';
import './components/styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext'; // Only import UserProvider here
import LoginRegister from './components/LoginRegister';
import Transaction from './components/Transaction';
import Home from './components/Home';
import PendingTransaction from './components/PendingTransaction';
import PendingTransactionList from './components/PendingTransaction';
import ApprovedTransaction from './components/ApprovedTransaction';
import Profile from './components/Profile';

function App() {
  return (
    <UserProvider> {/* Wrap everything within UserProvider */}
      <Router>
        <div className="App">
          <Routes>
            <Route path="/pending-transactions-list" element={<PendingTransactionList />} />
            <Route path="/pending-transaction-details" element={<PendingTransaction />} />
            <Route path="/approved-transaction" element={<ApprovedTransaction />} />
            <Route path="/" element={<LoginRegister />} />
            <Route path="/home" element={<Home />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
