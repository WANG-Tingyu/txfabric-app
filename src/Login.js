import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [orgName, setOrgName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !orgName) {
        alert('Please fill in all fields');
        return;
    }
    onLogin(username, orgName);
  };

  return (
    <div className="login-container">
     
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="orgName">Organization Name</label>
          <input
            type="text"
            id="orgName"
            name="orgName"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
