//import logo from './logo.svg';
import './components/styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginRegister from './components/LoginRegister';
import Transaction from './components/Transaction';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<LoginRegister />} />
          <Route path='/home' element={<Home />} />
          <Route path='/transaction' element={<Transaction />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

