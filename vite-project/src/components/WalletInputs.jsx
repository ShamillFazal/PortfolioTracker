import PropTypes from 'prop-types';



function WalletInputs({ wallet, setWallet, chain, setChain }) {
  return (
    <>
      <h1>Enter wallet & chain address</h1>
      <p>
        <span>Wallet Address </span>
        <input
          type="text"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
        ></input>
      </p>
      <span>Select Chain </span>
      <select onChange={(e) => setChain(e.target.value)} value={chain}>
        <option value="0x1">Ethereum</option>
        <option value="0x89">Polygon</option>
        <option value="0x38">BSC</option>
        <option value="0xa86a">Avalanche</option>
        <option value="0xfa">Fantom</option>
        <option value="0xa4b1">Arbitrum</option>
      </select>
    </>
  );
}

WalletInputs.propTypes = {
    wallet: PropTypes.string.isRequired,
    setWallet: PropTypes.func.isRequired,
    chain: PropTypes.string.isRequired,
    setChain: PropTypes.func.isRequired,
  };

export default WalletInputs;
