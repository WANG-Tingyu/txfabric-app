import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import props from 'prop-types';

function Navbar({onLogout}) {
    const navigate = useNavigate();


    const handleLogout = () => {
        onLogout();
        navigate('/');
      };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/add-transaction">Add Transaction</Link></li>
        <li><Link to="/query-transaction">Query Transaction</Link></li>
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;

