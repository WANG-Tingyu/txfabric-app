import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage({ token }) {
  

  return (
    <div className="home-page-container">
      <div className="content">
        <h1>Welcome to the Stock Transaction App</h1>
        <p>This is a simple app that allows you to manage your stock transactions.</p>
        <p>Use the navigation bar above to add or query transactions, or to log out.</p>
      </div>
    </div>
  );
}

export default HomePage;
