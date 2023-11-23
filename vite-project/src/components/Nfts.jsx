import axios from "axios";
import Proptypes from "prop-types";
import { useState, useEffect } from "react";
import { Reload } from "@web3uikit/icons";
import { Input } from "@web3uikit/core";

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
      <div className="tabHeading">
        NFT&apos;s <Reload onClick={getUserNfts} />
      </div>

      <div className="filter">
        <Input
          id="Namef"
          label="Name Filter"
          value={nameF}
          onChange={(e) => setNameF(e.target.value)}
        />

        <Input
          id="Idf"
          label="ID Filter"
          value={idF}
          onChange={(e) => setIdF(e.target.value)}
        />
      </div>

      <div className="nftList">
        {filteredNfts.length > 0 &&
          filteredNfts.map((e) => {
            return (
              <>
                <div className="nftInfo">
                  {e.image && <img src={e.image} width={200} />}

                  <div>{e.name},</div>
                  <div>#{e.token_id.slice(0, 5)}</div>
                </div>
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
