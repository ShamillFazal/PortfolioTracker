import PropTypes from "prop-types";
import { Input, Select, CryptoLogos } from "@web3uikit/core";
import logo from "../images/Shamill-logos_transparent.png";

function WalletInputs({ wallet, setWallet, chain, setChain }) {
  return (
    <>
      <header className="bg-white border-b border-gray-300 pb-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <img
            alt="Shamill"
            src={logo}
            height="auto"
            width="150px"
          />
        </div>


        <div className="flex flex-col md:flex-row gap-4">
          <Input
            id="Wallet"
            label="Wallet Address"
            placeholder="Enter your wallet address"
            value={wallet}
            style={{ height: "50px" }}
            onChange={(e) => setWallet(e.target.value)}
          />

          <Select
            defaultOptionIndex={0}
            id="Chain"
            label="Chain"
            onChange={(e) => setChain(e.value)}
            options={[
              {
                id: "eth",
                label: "Ethereum",
                value: "0x1",
                prefix: <CryptoLogos chain="ethereum" />,
              },
              {
                id: "matic",
                label: "Polygon",
                value: "0x89",
                prefix: <CryptoLogos chain="polygon" />,
              },
              {
                id: "bsc",
                label: "Binance Smart Chain",
                value: "0x38",
                prefix: <CryptoLogos chain="binance" />,
              },
              {
                id: "avax",
                label: "Avalanche",
                value: "0xA86A",
                prefix: <CryptoLogos chain="avalanche" />,
              },
              {
                id: "fantom",
                label: "Fantom",
                value: "0xFA",
                prefix: <CryptoLogos chain="fantom" />,
              },
              {
                id: "arbitrum",
                label: "Arbitrum",
                value: "0xA4B1",
                prefix: <CryptoLogos chain="arbitrum" />,
              }
            ]}
          />
        </div>
        {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Connect
        </button> */}
      </header>
    </>
  );
}

WalletInputs.propTypes = {
  wallet: PropTypes.string.isRequired,
  setWallet: PropTypes.func.isRequired,
  chain: PropTypes.string.isRequired,
  setChain: PropTypes.func.isRequired,
};

export default WalletInputs;
