import React, { useState } from 'react';
import axios from 'axios';
import './QueryTransaction.css';

function QueryTransaction({ token }) {
  const [id, setId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!setId) {
        alert('Please fill in all fields.');
        return;
    }
    axios.get(`http://localhost:4000/channels/mychannel/chaincodes/transaction_cc?args=["${id}"]&fcn=GetStockTxById`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then((response) => {
      setResult(response.data.result);
      setError(null);
    })
    .catch((error) => {
      console.error(error);
      setResult(null);
      setError('Error occurred while fetching transaction.');
    });
  };

  return (
    <div className="query-transaction-container">
      <form onSubmit={handleSubmit}>
        <h1>Query Transaction</h1>
        <div className="form-group">
          <label htmlFor="id">Transaction ID</label>
          <input
            type="text"
            id="id"
            name="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <button type="submit">Query</button>
      </form>
      {result && (
        <table className="result-table">
          <tbody>
            <tr>
              <td>ID:</td>
              <td>{result.id}</td>
            </tr>
            <tr>
              <td>Trade Date:</td>
              <td>{result.trade_date}</td>
            </tr>
            <tr>
              <td>Buyer:</td>
              <td>{result.buyer}</td>
            </tr>
            <tr>
              <td>Seller:</td>
              <td>{result.seller}</td>
            </tr>
            <tr>
              <td>Stock Code:</td>
              <td>{result.stock_code}</td>
            </tr>
            <tr>
              <td>Quantity:</td>
              <td>{result.quantity}</td>
            </tr>
            <tr>
              <td>Price:</td>
              <td>{result.price}</td>
            </tr>
          </tbody>
        </table>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default QueryTransaction;


