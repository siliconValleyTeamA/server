var express = require("express");
var router = express.Router();

const categoryMockData = require("../mocks/category.json");

router.get("/", function (req, res, next) {
  console.log(categoryMockData);
  res.json(categoryMockData);
});

module.exports = router;
