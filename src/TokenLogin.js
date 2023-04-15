import React, { useState } from 'react';
import pkcs11 from 'pkcs11js';

const TOKEN_LABEL = '44059D53E83935412FC3BE525D6C2B09D94BFA5F';
const PIN_LENGTH = 9;

function TokenLogin() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const session = await openSession();
      const isValid = await verifyPin(session);
      if (isValid) {
        // Login success, redirect to home page
        window.location.href = '/';
      } else {
        setError('Invalid PIN');
      }
      await session.logout();
      await session.close();
    } catch (e) {
      console.error(e);
      setError('Failed to login, please try again later');
    }
  };

  const openSession = async () => {
    const mod = pkcs11.Module.load('/usr/local/lib/libeTPkcs11.dylib');
    mod.initialize();
    const slots = mod.getSlots();
    const slot = slots.find(s => s.getToken().label === TOKEN_LABEL);
    const session = slot.open(pkcs11.CKF_SERIAL_SESSION | pkcs11.CKF_RW_SESSION);
    return session;
  };

  const verifyPin = async (session) => {
    const pinBuf = pkcs11.Utils.str2buf(pin.padEnd(PIN_LENGTH, '\0'));
    try {
      session.login(pkcs11.CKU_USER, pinBuf);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        PIN:
        <input type="password" value={pin} onChange={event => setPin(event.target.value)} />
      </label>
      <button type="submit">Login</button>
      {error && <div>{error}</div>}
    </form>
  );
}
export default TokenLogin;