import axios from "axios";
import Proptypes from "prop-types";

function Nfts({ wallet, chain, nfts, setNfts }) {
  async function getUserNfts() {
    const response = await axios.get("http://localhost:8080/nftBalance", {
      params: {
        address: wallet,
        chain: chain,
      },
    });
  }

  return <div>Nfts</div>;
}

Nfts.propTypes = {
  wallet: Proptypes.string.isRequired,
  chain: Proptypes.string.isRequired,
  nfts: Proptypes.array.isRequired,
  setNfts: Proptypes.func.isRequired,
};

export default Nfts;
