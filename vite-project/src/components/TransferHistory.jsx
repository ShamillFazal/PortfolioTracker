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
    console.log(response);

    if (response.data) {
      setTransfers(response.data);
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
            {transfers.map((transfer) => (
              <div key={transfer.block_timestamp} className="bg-gray-200 p-2 mb-4 rounded-lg">
                <div>{transfer.token_symbol}</div>
                <div>{(Number(transfer.value) / Number(`1e${transfer.token_decimals}`)).toFixed(3)}</div>
                <div>{new Date(transfer.block_timestamp).toLocaleString()}</div>
              </div>
            ))}
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
