//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import MyAccount from './components/MyAccount';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/my-account' element={<MyAccount />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

