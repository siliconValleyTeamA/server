var express = require("express");
var router = express.Router();

const {
  getScheduleProject,
  getSoonSuccessProject,
  getPopularProject,
  getCategoryProject,
  getProjectDetail,
  getUserJjim,
} = require("../db/project");

router.get("/schedule", async function (req, res, next) {
  res.json(await getScheduleProject());
});

router.get("/success", async function (req, res, next) {
  res.json(await getSoonSuccessProject());
});

router.get("/popular", async function (req, res, next) {
  res.json(await getPopularProject());
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

router.get("/:projectId", async function (req, res, next) {
  const projectId = req.params.projectId;
  res.json(await getProjectDetail({ projectId }));
});

router.get("/:projectId/jjim", async function (req, res, next) {
  const projectId = req.params.projectId;
  const userId = 3;
  const rows = await getUserJjim({ projectId, userId });
  if (rows.length != 0) res.json({ success: true });
  res.json({ success: false });
});

module.exports = router;
