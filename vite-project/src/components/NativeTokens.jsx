import axios from "axios";
import PropTypes from "prop-types";

function NativeTokens({
  wallet,
  chain,
  nativeBalance,
  setNativeBalance,
  nativeValue,
  setNativeValue,
}) {
  async function getNativeBalance() {
    const response = await axios.get("http://localhost:8080/nativeBalance", {
      params: {
        address: wallet,
        chain: chain,
      },
    });

    if (response.data.balance && response.data.usd) { // Checking if response data contains balance and USD values
      setNativeBalance((Number(response.data.balance) / 1e18).toFixed(3)); // Setting native balance after converting and formatting
      setNativeValue(
        (
          (Number(response.data.balance) / 1e18) *
          Number(response.data.usd)
        ).toFixed(2)
      );
    }
  }

  return (
    <>
      <h1>Get Tokens</h1>
      <p>
        <button onClick={getNativeBalance}>Get Balance</button>
        <br />
        <span>
          Native Balance: {nativeBalance}, ($ {nativeValue})
        </span>
      </p>
    </>
  );
}

NativeTokens.propTypes = {
  wallet: PropTypes.string.isRequired,
  chain: PropTypes.string.isRequired,
  nativeBalance: PropTypes.string.isRequired,
  setNativeBalance: PropTypes.func.isRequired,
  nativeValue: PropTypes.string.isRequired,
  setNativeValue: PropTypes.func.isRequired,
};

export default NativeTokens;
