const Moralis = require("moralis").default;
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
require("dotenv").config();

Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

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

app.get("/tokenBalances", async (req, res) => {
  try {
    const { address, chain } = req.query;

    const response = await Moralis.EvmApi.token.getWalletTokenBalances({
      address: address,
      chain: chain,
    });

    let tokens = response.raw;

    // Create an array to hold legit tokens
    let realTokens = [];

    // Iterate through the tokens
    for (const token of tokens) {
      if (!token.possible_spam) {
        // Push non-spam tokens into realTokens
        realTokens.push(token);
      }
    }

    // Fetch prices for all legit tokens individually
    for (const token of realTokens) {
      try {
        const priceResponse = await Moralis.EvmApi.token.getTokenPrice({
          address: token.token_address,
          chain: chain,
        });

        // Check if price data is available
        if (priceResponse.raw && priceResponse.raw.usdPrice) {
          token.usd = priceResponse.raw.usdPrice;
        } else {
          token.usd = 0; // Set a default value if USD price is not available
        }
      } catch (e) {
        console.log(e);
      }
    }

    res.send(realTokens); // Send the response with token.usd included
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/tokenTransfers", async (req, res) => {
  try {
    const { address, chain } = req.query;

    const response = await Moralis.EvmApi.token.getWalletTokenTransfers({
      address: address,
      chain: chain,
    });

    const userTransfers = response.raw.result;

    res.send(userTransfers); 
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ error: "An error occurred" });
  }
});
