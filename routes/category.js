var express = require("express");
var router = express.Router();

const categoryMockData = require("../mocks/category.json");

router.get("/", function (req, res, next) {
  res.json(categoryMockData);
});

module.exports = router;
