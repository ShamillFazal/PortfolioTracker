import axios from "axios";
import PropTypes from "prop-types";
import { Table } from "@web3uikit/core";
import { Reload } from "@web3uikit/icons";

function NativeTokens({
  wallet,
  chain,
  nativeBalance,
  setNativeBalance,
  nativeValue,
  setNativeValue,
}) {

  // Define a mapping of chain IDs to native tokens
  const nativeTokens = {
    "0x1": "ETH",        // Use the Ethereum chain ID "0x1"
    "0x89": "MATIC",     // Use the Polygon chain ID "0x89"
    "0x38": "BNB",       // Use the Binance Smart Chain ID "0x38"
    "0xa86a": "AVAX",    // Use the Avalanche chain ID "0xa86a"
    "0xfa": "FTM",       // Use the Fantom chain ID "0xfa"
    "0xa4b1": "ARB",     // Use the Arbitrum chain ID "0xa4b1"
  };

  // Function to get the native token based on the selected chain
  const getNativeToken = () => nativeTokens[chain];

  async function getNativeBalance() {
    const response = await axios.get("https://c-a-t.onrender.com/nativeBalance", {
      params: {
        address: wallet,
        chain: chain,
      },
    });

    if (response.data.balance && response.data.usd) {
      // Checking if response data contains balance and USD values
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
      <div className="tabHeading">
        Native Balance <Reload onClick={getNativeBalance} />
      </div>
      <div className="hidden md:block">
        {nativeBalance > 0 && nativeValue > 0 && (
          <Table
            pageSize={1}
            noPagination={true}
            style={{ width: "900px" }}
            columnsConfig="300px 300px 250px"
            data={[["Native", nativeBalance, `$${nativeValue}`]]}
            header={[
              <span key="currency">Token</span>,
              <span key="balance">Balance</span>,
              <span key="value">Value</span>,
            ]}
          />
        )}
      </div>
      <div className="block md:hidden">
        {nativeBalance > 0 && nativeValue > 0 && (
          <div className="bg-white-200 shadow-md p-2 rounded-lg flex flex-row justify-between items-center">
            <div className="basis-1/4">{getNativeToken()}</div>
            <div>
              <div className="flex-grow text-right">${nativeValue}</div>
              <div className="flex-grow text-right">{nativeBalance}</div>
            </div>
          </div>
        )}
      </div>
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
