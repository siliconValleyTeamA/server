var express = require("express");
var router = express.Router();

const {
  getPoint,
  getHistory,
  getCart,
  addCart,
  editCart,
  deleteCart,
  chargePoint,
  getJjim,
  addJjim,
  deleteJjim,
} = require("../db/user");

router.post("/logout", function (req, res, next) {
  res.json({ test: "success" });
});

router.get("/point", async function (req, res, next) {
  req.user = {
    id: 3,
  };
  const rows = await getPoint(req);
  res.json(rows[0].point);
});

router.put("/point", async function (req, res, next) {
  req.user = {
    id: 3,
  };
  await chargePoint(req);
});

router.get("/history", async function (req, res, next) {
  req.user = {
    id: 3,
  };
  const rows = await getHistory(req);
  res.json(rows);
});

router.get("/carts", async function (req, res, next) {
  req.user = {
    id: 3,
  };
  const rows = await getCart(req);
  res.json(rows);
});

router.post("/carts", async function (req, res, next) {
  const money = parseInt(req.body.money.replace(/,/g, ""));
  const project_id = parseInt(req.body.projectId);
  await addCart({
    date: new Date(),
    money: money,
    project_id: project_id,
    user_id: 3,
  });
});

router.put("/carts", async function (req, res, next) {
  const rows = await editCart(req);
  res.json(rows);
});

router.delete("/carts", async function (req, res, next) {
  const rows = await deleteCart(req);
  res.json({ success: true });
});

router.get("/jjim", async function (req, res, next) {
  req.user = {
    id: 3,
  };
  const rows = await getJjim(req);
  res.json(rows);
});

router.post("/jjim", async function (req, res, next) {
  const project_id = parseInt(req.body.projectId);
  await addJjim({
    date: new Date(),
    project_id: project_id,
    user_id: 3,
  });
});

router.delete("/jjim", async function (req, res, next) {
  const project_id = parseInt(req.body.projectId);
  const rows = await deleteJjim({
    project_id: project_id,
    user_id: 3,
  });
  res.json({ success: true });
});

module.exports = router;
