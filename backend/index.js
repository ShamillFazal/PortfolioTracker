const Moralis = require("moralis").default;
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
require("dotenv").config();

Moralis.start({ apiKey: process.env.MORALIS_API_KEY })

app.use(cors());


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//GET AMOUNT AND VALUE OF NATIVE TOKENS

app.get("/nativeBalance", async (req, res) => {
    // await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
  
    try {
      const { address, chain } = req.query;
  
      const response = await Moralis.EvmApi.balance.getNativeBalance({
        address: address,
        chain: chain,
      });
  
      const nativeBalance = response.raw;
  
      let nativeCurrency;
      if (chain === "0x1") {
        nativeCurrency = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; // Ethereum (chain ID 1)
      } else if (chain === "0x89") {
        nativeCurrency = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"; // Polygon (chain ID 137)
      } else if (chain === "0x38") {
        nativeCurrency = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"; // Binance Smart Chain (chain ID 97)
      } else if (chain === "0xfa") {
        nativeCurrency = "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83"; // Fantom Opera (chain ID 250)
      } else if (chain === "0xa86a") {
        nativeCurrency = "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"; // Avalanche C-Chain (chain ID 43114)
      } else if (chain === "0xa4b1") {
        nativeCurrency = "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"; // Arbitrum One (chain ID 42161)
      }

  
      const nativePrice = await Moralis.EvmApi.token.getTokenPrice({
        address: nativeCurrency, //WETH Contract
        chain: chain,
      });
  
      nativeBalance.usd = nativePrice.raw.usdPrice;
  
      res.send(nativeBalance);
    } catch (e) {
      console.error("Error:", e);
      res.status(500).json({ error: "An error occurred" });
    }
  });







  
























