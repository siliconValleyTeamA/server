var express = require("express");
var router = express.Router();

const { getScheduleProject } = require("../db/category");

router.get("/", async function (req, res, next) {
  res.json(await getScheduleProject());
});

module.exports = router;
