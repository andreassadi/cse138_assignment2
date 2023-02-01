const express = require("express");
const follower = require("./follower_router");
const main = require("./main_router");
const port = process.env.PORT || 13800;
const forwardingAddress = process.env.FORWARDING_ADDRESS;
const app = express();
app.use(express.json());

if (forwardingAddress) {
  console.log("FOLLOWER");
  app.use("/kvs", follower);
} else {
  console.log("MAIN");
  app.use("/kvs", main);
}

/* Error handling middleware */
app.use(function (err, req, res, next) {
  res.status(400).json({ error: `bad ${req.method}` });
});

app.listen(port);
