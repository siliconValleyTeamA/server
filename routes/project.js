var express = require("express");
var router = express.Router();
var {
  sortByPercent,
  sortByAmount,
  sortByClosing,
  sortByJjim,
} = require("../utils");

const goodsMockData = require("../mocks/goods.json");

router.get("/schedule", function (req, res, next) {
  res.json(goodsMockData);
});

router.get("/success", function (req, res, next) {
  res.json(goodsMockData);
});

router.get("/popular", function (req, res, next) {
  goodsMockData.sort(sortByJjim);
  res.json(goodsMockData);
});

router.get("/category/:categoryId/:filterType", function (req, res, next) {
  const filterType = req.params.filterType;
  switch (filterType) {
    case "percent":
      goodsMockData.sort(sortByPercent);
      break;
    case "amount":
      goodsMockData.sort(sortByAmount);
      break;
    case "closing":
      goodsMockData.sort(sortByClosing);
      break;
    default:
      goodsMockData.sort(sortByPercent);
  }
  res.json(goodsMockData);
});

router.get("/:projectId", function (req, res, next) {
  const projectId = req.params.projectId;
  res.json(goodsMockData.find((goods) => goods.id == projectId));
});

module.exports = router;
