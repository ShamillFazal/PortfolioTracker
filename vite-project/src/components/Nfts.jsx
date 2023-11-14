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

    if (response.data.result) {
      nftP(response.data.result); // Process and update NFTs using the result data.
    }
  }

  // Function to process and update the NFTs by extracting image URLs from metadata.

  function nftP(p) {
    for (let i = 0; i < p.length; i++) {
      let meta = JSON.parse(p[i].metadata);
      if (meta && meta.image) {
        if (meta.image.includes(".")) { // Use the image URL directly if it includes a dot.
          p[i].image = meta.image;
        } else {
          p[i].image = "https://ipfs.moralis.io:2053/ipfs/" + meta.image; // Otherwise, construct the image URL.
        }
      }
    }

    setNfts(p); // Update the component state with the processed NFTs.
  }

  return (
    <>
      <h1>NFTs</h1>
      <div>
        <button onClick={getUserNfts}>Get NFTs</button>
        
        {/* Mapping over the array of NFTs to render each NFT along with its information.t */}

        {nfts.length > 0 &&
          nfts.map((e) => {
            return (
              <>
                {e.image && <img src={e.image} alt={e.name} />}
                <span>Name: {e.name},</span>
                <span>(ID: {e.token_id})</span>
                <br />
              </>
            );
          })}
      </div>
      ;
    </>
  );
}

Nfts.propTypes = {
  wallet: Proptypes.string.isRequired,
  chain: Proptypes.string.isRequired,
  nfts: Proptypes.array.isRequired,
  setNfts: Proptypes.func.isRequired,
};

export default Nfts;
