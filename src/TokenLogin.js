import React, { useState } from 'react';
import './TokenLogin.css';
import Token from 'node-etoken-lib';
import axios from 'axios';

function TokenLogin() {
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Initialize token object
    const token = new Token();

    // Load library file
    const lib = token.loadPKCS11Library('/Users/daisy/Desktop/libeToken.dylib');

    // List available slots (terminals)
    const slots = token.getSlots(lib);

    // Check if a token is present
    if (slots.length === 0) {
      setErrorMessage('No token is recognized.');
      return;
    }

    // Get PIN from input field
    const pin = e.target.pin.value;

    // Check if PIN is not empty
    if (!pin) {
      setErrorMessage('PIN is empty.');
      return;
    }

    // Get the first available slot
    const slot = slots[0];

    // Check if the token is present in the slot
    if (!token.isTokenPresent(slot)) {
      setErrorMessage('No token is present in the slot.');
      return;
    }

    // Open the session
    const session = token.openSession(slot);

    try {
      // Login to the token with the given PIN
      token.login(session, pin);

      // Get the user's certificate from the token
      const cert = token.getCertificate(session);

      // Convert the certificate to PEM format
      const pem = token.getCertificatePEM(cert);

      // Send the certificate to the backend to authenticate the user
      axios.post('http://localhost:4000/authenticate', { certificate: pem })
        .then((response) => {
          console.log(response);
          // TODO: handle successful authentication
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage('Authentication failed. Please try again.');
        });
    } catch (error) {
      console.error(error);
      setErrorMessage('Invalid PIN. Please try again.');
    } finally {
      // Close the session
      token.closeSession(session);
    }
  };

  return (
    <div className="token-login-container">
      <form onSubmit={handleSubmit}>
        <h1>Token Login</h1>
        <div className="form-group">
          <label htmlFor="pin">PIN</label>
          <input
            type="password"
            id="pin"
            name="pin"
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default TokenLogin;
