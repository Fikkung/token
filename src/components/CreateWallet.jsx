import TronWeb from 'tronweb';
import { useState } from 'react';

function CreateWallet() {
  const [walletAddress, setWalletAddress] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  const createWallet = () => {
    const tronWeb = new TronWeb({
      fullHost: 'https://api.nileex.io',
    });

    const newWallet = tronWeb.createAccount();
    setWalletAddress(newWallet.address.base58);
    setPrivateKey(newWallet.privateKey);
    
    // คุณสามารถเก็บข้อมูลนี้ในฐานข้อมูลของคุณได้ที่นี่
    console.log('Wallet Address:', newWallet.address.base58);
    console.log('Private Key:', newWallet.privateKey);

    // เรียก API ของคุณเพื่อจัดเก็บที่อยู่และคีย์ส่วนตัวในฐานข้อมูล
    // fetch('/api/saveWallet', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     address: newWallet.address.base58,
    //     privateKey: newWallet.privateKey,
    //   }),
    // });
  };

  return (
    <div className="create-wallet-container">
      <h2>Create New Wallet</h2>
      <button onClick={createWallet}>Create Wallet</button>
      {walletAddress && (
        <div>
          <p>Wallet Address: {walletAddress}</p>
          <p>Private Key: {privateKey}</p>
        </div>
      )}
    </div>
  );
}

export default CreateWallet;
