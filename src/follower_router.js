const express = require("express");
const router = express.Router();
const { createProxyMiddleware } = require("http-proxy-middleware");
const forwardingAddress = process.env.FORWARDING_ADDRESS;
const forwardingURL = `http://${forwardingAddress}`;

function onError(err, req, res, target) {
  res.status(503).send({ error: "upstream down", upstream: forwardingAddress });
}

const options = {
  target: forwardingURL,
  changeOrigin: true,
  proxyTimeout: 10000,
  onError: onError,
};

router.use("/", createProxyMiddleware(options));

module.exports = router;
