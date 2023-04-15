import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import HomePage from './HomePage';
import AddTransaction from './AddTransaction';
import QueryTransaction from './QueryTransaction';
import Navbar from './Navbar';
//import TokenLogin from './TokenLogin';
import React, { useState } from 'react';


function App() {
  const [token, setToken] = useState('');

  const handleLogin = (username, orgName) => {
    axios.post('http://localhost:4000/users', {
      username: username,
      orgName: orgName,
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((response) => {
      setToken(response.data.token);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  const handleLogout = () => {
    setToken(null);
  };
  return (
    <Router>
      {token && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={token ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} />
        <Route path="/home" element={token ? <HomePage token={token} /> : <Navigate to="/" />} />
        <Route path="/add-transaction" element={token ? <AddTransaction token={token} /> : <Navigate to="/" />} />
        <Route path="/query-transaction" element={token ? <QueryTransaction token={token} /> : <Navigate to="/" />} />

        {/* <Route path="/test-token" element={<TokenLogin/>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
