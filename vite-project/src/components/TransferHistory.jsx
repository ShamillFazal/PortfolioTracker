import axios from "axios";
import PropTypes from "prop-types";
import { Reload } from "@web3uikit/icons";
import { Table } from "@web3uikit/core";
function TransferHistory({ chain, wallet, transfers, setTransfers }) {
  async function getTransfers() {
    const response = await axios.get("http://localhost:8080/tokenTransfers", {
      params: {
        address: wallet,
        chain: chain,
      },
    });
    if (response.data) {
      setTransfers(response.data);
    }
  }
  function getChainPrefix(chain) {
    const chainString = typeof chain === "string" ? chain : chain.toString();

    switch (chainString) {
      case "0x1": // Ethereum
        return "etherscan.io/";
      case "0x89": // Polygon
        return "polygonscan.com/";
      case "0x38": // Binance Smart Chain
        return "bscscan.com/";
      case "0xa86a": // Avalanche
        return "cchain.explorer.avax.network/";
      case "0xfa": // Fantom
        return "ftmscan.com/";
      case "0xa4b1": // Arbitrum
        return "arbiscan.io/";
      default:
        return ""; // Handle other cases as needed
    }
  }
  return (
    <>
      <div className="tabHeading">
        History <Reload onClick={getTransfers} />
      </div>
      <div className="hidden md:block">
        {transfers.length > 0 && (
          <Table
            pageSize={8}
            noPagination={false}
            style={{ width: "90vw" }}
            columnsConfig="16vw 18vw 18vw 18vw 16vw"
            data={transfers.map((e) => [
              e.token_symbol,
              (Number(e.value) / Number(`1e${e.token_decimals}`)).toFixed(3),
              `${e.from_address.slice(0, 4)}...${e.from_address.slice(38)}`,
              `${e.to_address.slice(0, 4)}...${e.to_address.slice(38)}`,
              new Date(e.block_timestamp).toLocaleString(),
            ])}
            header={[
              <span key="token">Token</span>,
              <span key="value">Amount</span>,
              <span key="from">From</span>,
              <span key="to">To</span>,
              <span key="date">Date</span>,
            ]}
          />
        )}
      </div>
      <div className="block md:hidden">
        {/* Display only token, amount, and date for smaller screens */}
        {transfers.length > 0 && (
          <div>
            {transfers.map((transfer, index) => {
              const chainPrefix = getChainPrefix(chain);
              const trackingURL = `https://${chainPrefix}tx/${transfer.transaction_hash}`;
              return (
                <div
                  key={`${transfer.block_timestamp}-${transfer.transaction_hash}-${index}`}
                  className="bg-white-200 shadow-md p-2 mb-4 rounded-lg flex flex-row justify-between items-center"
                >
                  <div className="basis-1/4">{transfer.token_symbol}</div>
                  <div>
                    <div className="flex-grow text-right">
                      {(
                        Number(transfer.value) /
                        Number(`1e${transfer.token_decimals}`)
                      ).toFixed(3)}
                    </div>
                    <a
                      href={trackingURL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="flex-grow text-right">{`${transfer.transaction_hash.slice(
                        0,
                        3
                      )}...${transfer.transaction_hash.slice(-3)}`}</div>
                    </a>
                    <div className="flex-grow text-right">
                      {new Date(transfer.block_timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

TransferHistory.propTypes = {
  chain: PropTypes.string.isRequired,
  wallet: PropTypes.string.isRequired,
  transfers: PropTypes.array.isRequired,
  setTransfers: PropTypes.func.isRequired,
};

export default TransferHistory;
