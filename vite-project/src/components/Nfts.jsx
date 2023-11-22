import axios from "axios";
import Proptypes from "prop-types";
import { useState, useEffect } from "react";

function Nfts({ wallet, chain, nfts, setNfts, filteredNfts, setFilteredNfts }) {
  const [nameF, setNameF] = useState("");
  const [idF, setIdF] = useState("");

  useEffect(() => {
    if (nameF === 0 && idF === 0) {
      return setFilteredNfts(nfts);
    }
  
    let filteredNfts = [];
  
    for (let i = 0; i < nfts.length; i++) {
      if (
        nfts[i].name &&
        nfts[i].name.toLowerCase().includes(nameF.toLowerCase()) &&
        idF.length === 0
      ) {
        filteredNfts.push(nfts[i]);
      } else if (
        nfts[i].token_id &&
        nfts[i].token_id.toLowerCase().includes(idF.toLowerCase()) &&
        nameF.length === 0
      ) {
        filteredNfts.push(nfts[i]);
      } else if (
        nfts[i].token_id &&
        nfts[i].token_id.toLowerCase().includes(idF.toLowerCase()) &&
        nfts[i].name &&
        nfts[i].name.toLowerCase().includes(nameF.toLowerCase())
      ) {
        filteredNfts.push(nfts[i]);
      }
    }
  
    setFilteredNfts(filteredNfts);
  }, [nameF, idF]);
  
  

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
        // Check if the image URL has a nested "ipfs://ipfs/"
        if (meta.image.startsWith("ipfs://ipfs/")) {
          // Remove the nested "ipfs://" prefix
          p[i].image = "https://ipfs.io/ipfs/" + meta.image.slice(12);
        } else if (meta.image.startsWith("ipfs://")) {
          // If the image URL starts with "ipfs://", remove the prefix
          p[i].image = "https://ipfs.io/ipfs/" + meta.image.slice(7);
        } else if (!meta.image.includes("https://ipfs.io/ipfs/")) {
          // Ensure the image URL doesn't already have the prefix
          p[i].image = "https://ipfs.io/ipfs/" + meta.image;
        } else {
          // If it already has the correct prefix, use the URL as is
          p[i].image = meta.image;
        }
      }
    }

    setNfts(p);
    setFilteredNfts(p);
  }

  return (
    <>
      <h1>NFTs</h1>
      <div>
        <button onClick={getUserNfts}>Get NFTs</button>
        <span> Name Filter</span>
        <input onChange={(e) => setNameF(e.target.value)} value={nameF}></input>
        <span> ID Filter</span>
        <input onChange={(e) => setIdF(e.target.value)} value={idF}></input>
        <br />
        {/* Mapping over the array of NFTs to render each NFT along with its information */}

        {filteredNfts.length > 0 &&
          filteredNfts.map((e) => {
            return (
              <>
                {e.image && <img src={e.image} alt={e.name} width={250} />}
                <span>
                  {e.name} #{e.token_id}
                </span>

                <br />
              </>
            );
          })}
      </div>
    </>
  );
}

Nfts.propTypes = {
  wallet: Proptypes.string.isRequired,
  chain: Proptypes.string.isRequired,
  nfts: Proptypes.array.isRequired,
  setNfts: Proptypes.func.isRequired,
  filteredNfts: Proptypes.array.isRequired,
  setFilteredNfts: Proptypes.func.isRequired,
};

export default Nfts;
