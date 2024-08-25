import React, { useState } from "react";
import TronWeb from 'tronweb';

// ตั้งค่า TronWeb
const tronWeb = new TronWeb({
  fullHost: 'https://api.nileex.io',
  privateKey: '2c2c8b200cf421a5ece15e78518494927bc4184e3b257876f130d65b259d4b9f', // ใส่ private key ของคุณที่นี่
});

// ที่อยู่ของคอนแทร็กต์ TRC20
const contractAddress = 'TUDpiNMkq3zngeqmmCWfq56z5WpZfjuJCa'; 

async function transfer(recipient, amount) {
  try {
    const contract = await tronWeb.contract().at(contractAddress);
    const result = await contract.transfer(recipient, amount).send();
    console.log('Transfer successful:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

function Transfer() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await transfer(recipient, amount);
      setMessage('Transfer successful!');
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred.');
    }
  };

  return (
    <div className="transfer-container">
      <h2>Transfer Token</h2>
      <form onSubmit={handleSubmit}>
        <label>Recipient Address:</label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Enter recipient's wallet address"
          required
        />

        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount to transfer"
          required
        />

        <button type="submit">Transfer</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Transfer;
