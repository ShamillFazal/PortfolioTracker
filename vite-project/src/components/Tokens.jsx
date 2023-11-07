import axios from "axios";
import PropTypes from "prop-types";

function Tokens({ wallet, chain, tokens, setTokens }) {
  async function getTokenBalances() {
    const response = await axios.get("http://localhost:8080/tokenBalances", {
      params: {
        address: wallet,
        chain: chain,
      },
    });

    if (response.data) {
      let tkns = response.data;

      for (let i = 0; i < tkns.length; i++) {
        tkns[i].bal = (
          Number(tkns[i].balance) / Number(`1E${tkns[i].decimals}`)
        ).toFixed(3);
        tkns[i].value = (
          (Number(tkns[i].balance) / Number(`1E${tkns[i].decimals}`)) *
          Number(tkns[i].usd)
        ).toFixed(2);
      }

      setTokens(tkns);
    }
  }
  return (
    <>
      <p>
        <button onClick={getTokenBalances}>Get Tokens</button>
        <br />
        {tokens.length > 0 &&
          tokens.map((token) => {
            return (
              <>
                <span>
                  {token.symbol} {token.bal}, ($ {token.value})
                </span>
                <br />
              </>
            );
          })}
      </p>
    </>
  );
}

Tokens.propTypes = {
  wallet: PropTypes.string.isRequired,
  chain: PropTypes.string.isRequired,
  tokens: PropTypes.array.isRequired,
  setTokens: PropTypes.func.isRequired,
};

export default Tokens;
