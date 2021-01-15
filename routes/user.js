var express = require("express");
var router = express.Router();

const {
  getPoint,
  getHistory,
  getCart,
  addCart,
  editCart,
  deleteCart,
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

router.get("/history", async function (req, res, next) {
  req.user = {
    id: 3,
  };
  const rows = await getHistory(req);
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

router.get("/carts", async function (req, res, next) {
  req.user = {
    id: 3,
  };
  const rows = await getCart(req);
  res.json(rows);
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
  var sortjjimData = jjimData.sort(utils.sortByJjimTime);
  res.json(sortjjimData);
});

router.post("/jjim", function (req, res, next) {
  const projectId = req.body.projectId;
  const getGoodsData = goodsData.find((goods) => goods.id == projectId);
  const inserData = utils.createJjimData(getGoodsData, jjimData.length + 1);
  jjimData.push(inserData);
  res.json(jjimData);
});

router.delete("/jjim", function (req, res, next) {
  const projectId = req.body.projectId;
  jjimList = jjimList.filter((jjim) => jjim.id != projectId);
  res.json(jjimList);
});

module.exports = router;
