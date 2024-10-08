//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginRegister from './components/LoginRegister';
import Transaction from './components/Transaction';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<LoginRegister />} />
          <Route path='/transaction' element={<Transaction />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

