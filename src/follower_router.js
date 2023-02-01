const express = require("express");
const axios = require("axios");
const router = express.Router();
const forwardingAddress = process.env.FORWARDING_ADDRESS;
const forwardingURL = `http://${forwardingAddress}/kvs`;

console.log("FORWARDING URL: ", forwardingURL);

router.put("/", (req, res) => {});

router.get("/", async (req, res) => {
  console.log("BODY:", req.body);
  try {
    const response = await axios.get(forwardingURL, {
      headers: { "Content-Type": "application/json" },
      timeout: 10000,
      params: req.body,
    });
    console.log(response);
  } catch (error) {
    console.log("ERROR");
  }
});

router.delete("/", (req, res) => {});

module.exports = router;
