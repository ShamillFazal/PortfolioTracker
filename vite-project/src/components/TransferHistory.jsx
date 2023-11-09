import axios from "axios";
import PropTypes from "prop-types";

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
      <h1>Transfer History</h1>
      <div>
        <button onClick={getTransfers}>Fetch Transfers</button>

        <table>
          <tr>
            <th>Token</th>
            <th>Amount</th>
            <th>From</th>
            <th>To</th>
            <th>Date</th>
          </tr>
          {transfers.length > 0 &&
            transfers.map((e) => {
              return (
                <tr key={e.address}>
                  <td>{e.symbol}</td>
                  <td>
                    {(Number(e.value) / Number(`1e${e.decimals}`)).toFixed(3)}
                  </td>
                  <td>{e.from_address}</td>
                  <td>{e.to_address}</td>
                  <td>{e.block_timestamp}</td>
                </tr>
              );
            })}
        </table>
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
