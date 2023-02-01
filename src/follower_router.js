const express = require("express");
const router = express.Router();
const forwardingAddress = process.env.FORWARDING_ADDRESS;

router.get("/", (req, res) => {
  res.json("Follower Router");
});

module.exports = router;
