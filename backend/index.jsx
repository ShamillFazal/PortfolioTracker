const Moralis = require("moralis").default;
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
require("dotenv").config();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/nativeBalance", async (req, res) => {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const { address, chain } = req.query;

    const response = await Moralis.EvmApi.balance.getNativeBalance({
      address: address,
      chain: chain,
    });

    console.log("Response:", response);

    const nativeBalance = response.raw;
    console.log("Native Balance:", nativeBalance);

    res.send(nativeBalance);
  } catch (e) {
    res.send(e);
  }
});
