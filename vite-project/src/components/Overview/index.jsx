import { useState } from 'react';
import Moralis from 'moralis';

async function AddressSearch() {

    try {
        await Moralis.start({
          apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImQwNTEwNjA5LTMwYzYtNDUwNS05ZjQ2LWMwOTY3MzRkYTQ3ZSIsIm9yZ0lkIjoiMzU4MDE5IiwidXNlcklkIjoiMzY3OTUwIiwidHlwZUlkIjoiZWJiOThmNTAtODk4OS00MWMwLWFjYzAtOGRlYWNmZDE3MGQ1IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2OTUyMDMzMjAsImV4cCI6NDg1MDk2MzMyMH0.Y35y5EH3H3xfK5m0fgdIID-dCl7ea04n35Eh4mghoU4"
        });
      
        const response = await Moralis.EvmApi.balance.getNativeBalance({
          "chain": "0x1",
          "address": "0x057Ec652A4F150f7FF94f089A38008f49a0DF88e"
        });
      
        console.log(response.raw);
      } catch (e) {
        console.error(e);
      }


  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSearch = () => {
    if (isLoading) {
      console.log('Request in progress, please wait.');
      return;
    }

    setIsLoading(true);



  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter an Ethereum address"
        value={address}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Search'}
      </button>

      {balance !== null && (
        <div>
          <p>Balance: {balance.toFixed(18)} Ether</p>
        </div>
      )}
    </div>
  );
}

export default AddressSearch;
