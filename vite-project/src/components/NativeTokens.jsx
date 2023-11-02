import axios from "axios";

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

    if (response.raw.balance && response.raw.usd) {
      setNativeBalance((Number(response.raw.balance) / 1e18).toFixed(3));
      setNativeValue(
        (
          (Number(response.raw.balance) / 1e18) *
          Number(response.raw.usd)
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

export default NativeTokens;
