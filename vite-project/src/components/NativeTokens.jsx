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
  async function getNativeBalance() {
    const response = await axios.get("http://localhost:8080/nativeBalance", {
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
