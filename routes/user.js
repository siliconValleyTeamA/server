var express = require("express");
var router = express.Router();

const userData = require("../mocks/user.json");
const goodsData = require("../mocks/goods.json");
const historyData = require("../mocks/history.json");
const jjimData = require("../mocks/jjim.json");

let cartList = [];
let jjimList = [{ id: 1 }, { id: 2 }];

router.get("/point", function (req, res, next) {
  res.json(userData);
});

router.post("/cart", function (req, res, next) {
  const projectId = req.body.projectId;
  const insertData = goodsData.find((goods) => goods.id == projectId);
  cartList.push(insertData);
  res.json({ success: true });
});

router.delete("/jjim", function (req, res, next) {
  const projectId = req.body.projectId;
  jjimList = jjimList.filter((jjim) => jjim.id != projectId);
  res.json(jjimList);
});

router.get("/jjim",function(req, res, next) {
  res.json(jjimData);
});

router.get("/history",function(req, res, next) {
  res.json(historyData);
});

router.post("/fundings",function(req, res, next) {
  const projectId=req.body.projectId;
  const point =req.body.point;
  res.json(projectId,point);
});

router.post("/points",function(req, res, next) {
  const point= req.body.point;
  res.json(point);
});

module.exports = router;