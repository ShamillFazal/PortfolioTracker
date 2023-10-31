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
        <option value="0xaa">Fantom</option>
        <option value="0x4">Arbitrum</option>
      </select>
    </>
  );
}

export default WalletInputs;
