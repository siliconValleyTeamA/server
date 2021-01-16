var express = require("express");
var router = express.Router();

const { getCategory } = require("../db/category");

//모든 카테고리 조회
router.get("/", async function (req, res, next) {
  res.json(await getCategory());
});

module.exports = router;
