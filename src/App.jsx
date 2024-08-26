import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Transfer from './components/Transfer';
import CreateWallet from './components/CreateWallet';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      <h1>hi</h1>
      <Router>
        <div>
          {/* ปุ่มนำทาง */}
          {!isLoggedIn && <button><Link to="/login">Login</Link></button>}
          {!isLoggedIn && <button><Link to="/register">Register</Link></button>}
          {isLoggedIn && <button><Link to="/transfer">Transfer</Link></button>}
          {isLoggedIn && <button><Link to="/create-wallet">Create Wallet</Link></button>}
        </div>

        <Routes>
          <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} /> {/* หน้าเริ่มต้น */}
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/create-wallet" element={<CreateWallet />} />
        </Routes>
      </Router>
    </div>
  );
}
//
export default App;
