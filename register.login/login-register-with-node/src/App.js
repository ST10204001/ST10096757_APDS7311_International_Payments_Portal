//import logo from './logo.svg';
import './components/styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginRegister from './components/LoginRegister';
import Transaction from './components/Transaction';
import Home from './components/Home';
import ApprovedTransaction from './components/ApprovedTransaction';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<LoginRegister />} />
          <Route path='/home' element={<Home />} />
          <Route path='/transaction' element={<Transaction />} />
          <Route path='/approved-transaction' element={<ApprovedTransaction />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

