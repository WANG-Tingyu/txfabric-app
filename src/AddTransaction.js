import React, { useState } from 'react';
import axios from 'axios';
import './AddTransaction.css';

function AddTransaction({ token }) {
    const [id, setId] = useState('');
    const [tradeDate, setTradeDate] = useState('');
    const [buyer, setBuyer] = useState('');
    const [seller, setSeller] = useState('');
    const [stockCode, setStockCode] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [txid, setTxid] = useState('');

    const handleSubmit = (e) => {
    e.preventDefault();
    if (!id || !tradeDate || !buyer || !seller || !stockCode || !quantity || !price) {
        alert('Please fill in all fields.');
        return;
    }
    const data = {
      id: id,
      trade_date: tradeDate,
      buyer: buyer,
      seller: seller,
      stock_code: stockCode,
      quantity: parseInt(quantity),
      price: parseFloat(price),
    };
    axios.post('http://localhost:4000/channels/mychannel/chaincodes/transaction_cc', {
      fcn: 'CreateTx',
      chaincodeName: 'transaction_cc',
      channelName: 'mychannel',
      args: [JSON.stringify(data)],
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then((response) => {
        console.log(response);
        // setTxid(response.data.result.result.txid); 
        alert('Transaction added successfully! TxID: '+response.data.result.result.txid); // 添加成功后设置提示信息
        setId(''); // 重置表单中所有state为默认值
        setTradeDate('');
        setBuyer('');
        setSeller('');
        setStockCode('');
        setQuantity('');
        setPrice('');
    })
    .catch((error) => {
        console.error(error);
    });
  };

  return (
    <div className="add-transaction-container">
      <form onSubmit={handleSubmit}>
        <h1>Add / Modify Transaction</h1>
        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            id="id"
            name="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tradeDate">Trade Date</label>
          <input
            type="date"
            id="tradeDate"
            name="tradeDate"
            value={tradeDate}
            onChange={(e) => setTradeDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="buyer">Buyer</label>
          <input
            type="text"
            id="buyer"
            name="buyer"
            value={buyer}
            onChange={(e) => setBuyer(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="seller">Seller</label>
          <input
            type="text"
            id="seller"
            name="seller"
            value={seller}
            onChange={(e) => setSeller(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="stockCode">Stock Code</label>
          <input
            type="text"
            id="stockCode"
            name="stockCode"
            value={stockCode}
            onChange={(e) => setStockCode(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}  

export default AddTransaction;