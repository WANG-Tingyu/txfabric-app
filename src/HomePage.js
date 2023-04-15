import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage({ token }) {
  

  return (
    <div className="home-page-container">
      <div className="content">
        <h1>Welcome to the Stock Transaction Data Sharing Page</h1>
        <p>This is a simple app that allows you to manage your stock transactions data within your company.</p>
        <p>Use the navigation bar above to add/update or query transactions, or to log out.</p>
        <p>After add or update transaction, you can go to the couchDB to check update.</p>
        <p>If you add new data, the version is 1.</p>
        <p>If you update existing data, the version number will add 1.</p>
      </div>
    </div>
  );
}

export default HomePage;
