import { Reload } from "@web3uikit/icons";
import axios from "axios";
import PropTypes from "prop-types";
import { Table } from "@web3uikit/core";

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
      
        <div className="tabHeading">Assets<Reload onClick={getTokenBalances}/></div>
        <div className="hidden md:block">
        {tokens.length > 0 && (

        <Table
          pageSize={6}
          noPagination={true}
          style={{ width: "900px" }}
          columnsConfig="300px 300px 250px"
          data={tokens.map((e) => [e.symbol, e.bal, `$${e.value}`] )}
          header={[
            <span key="currency">Token</span>,
            <span key="balance">Balance</span>,
            <span key="value">Value</span>,
          ]}
        />
        )}
        </div>

        <div className="block md:hidden">
        {/* Display a grid for smaller screens */}
        {tokens.length > 0 && (
          <div className="grid grid-cols-1 gap-4">
            {tokens.map((token) => (
              <div key={token.symbol} className="bg-gray-200 p-2 rounded-lg">
                <div>{token.symbol}</div>
                <div>Balance: {token.bal}</div>
                <div>Value: ${token.value}</div>
                </div> 
                ))}
                </div>
                )}
                </div>

      
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
