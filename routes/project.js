var express = require("express");
var router = express.Router();

const goodsMockData = require("../mocks/goods.json");

router.get("/schedule", async function (req, res, next) {
  res.json(goodsMockData);
});

router.get("/success", async function (req, res, next) {
  res.json(goodsMockData);
});

module.exports = router;
