var express = require("express");
var router = express.Router();
var {
  sortByPercent,
  sortByAmount,
  sortByClosing,
  sortByJjim,
} = require("../utils");

const { getScheduleProject } = require("../db/project");

const goodsMockData = require("../mocks/goods.json");

router.get("/schedule", async function (req, res, next) {
  res.json(await getScheduleProject());
});

router.get("/success", function (req, res, next) {
  res.json(goodsMockData);
});

router.get("/popular", function (req, res, next) {
  res.json(goodsMockData);
});

router.get("/category/:categoryId/:filterType", function (req, res, next) {
  const filterType = req.params.filterType;
  const category = req.params.categoryId;
  const categoryProjectList = goodsMockData.filter(
    (good) => good.category_key === category || category == "all"
  );

  switch (filterType) {
    case "percent":
      categoryProjectList.sort(sortByPercent);
      break;
    case "amount":
      categoryProjectList.sort(sortByAmount);
      break;
    case "closing":
      categoryProjectList.sort(sortByClosing);
      break;
    default:
      categoryProjectList.sort(sortByPercent);
  }
  res.json(categoryProjectList);
});

router.get("/:projectId", function (req, res, next) {
  const projectId = req.params.projectId;
  console.log(goodsMockData.find((goods) => goods.id == projectId));
  res.json(goodsMockData.find((goods) => goods.id == projectId));
});

module.exports = router;
