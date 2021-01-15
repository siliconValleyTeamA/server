var express = require("express");
var router = express.Router();

const {
  getScheduleProject,
  getSoonSuccessProject,
  getCategoryProject,
} = require("../db/project");

const goodsMockData = require("../mocks/goods.json");

router.get("/schedule", async function (req, res, next) {
  res.json(await getScheduleProject());
});

router.get("/success", async function (req, res, next) {
  res.json(await getSoonSuccessProject());
});

router.get("/popular", function (req, res, next) {
  res.json(goodsMockData);
});

router.get(
  "/category/:categoryId/:filterType",
  async function (req, res, next) {
    const filterType = req.params.filterType;
    const category = req.params.categoryId;
    const rows = await getCategoryProject({
      category: category,
      filterType: filterType,
    });

    res.json(rows);
  }
);

router.get("/:projectId", function (req, res, next) {
  const projectId = req.params.projectId;
  res.json(goodsMockData.find((goods) => goods.id == projectId));
});

module.exports = router;
