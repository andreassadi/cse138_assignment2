const express = require("express");
const router = express.Router();
const kvs = require("./kvs");

router.put("/", (req, res) => {
  const key = req.body.key;
  const val = req.body.val;

  if (key.length > 200) {
    res.status(400).json({ error: "key or val too long" });
  } else if (key in kvs) {
    const prev = kvs[key];
    kvs[key] = val;
    res.status(200).json({ replaced: true, prev: prev });
  } else {
    kvs[key] = val;
    res.status(201).json({ replaced: false });
  }
});

router.get("/", async (req, res) => {
  const key = req.query.key;

  if (key == null) {
    res.status(400).json({ error: "bad GET" });
  } else if (key in kvs) {
    const val = kvs[key];
    res.status(200).json({ val: val });
  } else {
    res.status(404).json({ error: "not found" });
  }
});

router.delete("/", (req, res) => {
  const key = req.query.key;

  if (key == null) {
    res.status(400).json({ error: "bad DELETE" });
  } else if (key in kvs) {
    const prev = kvs[key];
    delete kvs[key];
    res.status(200).json({ prev: prev });
  } else {
    res.status(404).json({ error: "not found" });
  }
});

module.exports = router;
