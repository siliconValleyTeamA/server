var express = require("express");
var router = express.Router();

const { getCategory } = require("../db/category");

router.get("/", async function (req, res, next) {
  res.json(await getCategory());
});

module.exports = router;
