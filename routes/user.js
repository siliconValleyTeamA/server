var express = require("express");
var router = express.Router();
const utils = require("../utils.js");

const userData = require("../mocks/user.json");
const jjimData = require("../mocks/jjim.json");
const goodsData = require("../mocks/goods.json");

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

router.get("/jjim", async function(req, res, next){
  var sortjjimData = jjimData.sort(utils.sortByJjimTime);
  res.json(sortjjimData);
});

router.post("/jjim", function(req, res, next){
  const projectId = req.body.projectId;
  const getGoodsData = goodsData.find((goods) => goods.id == projectId);
  const inserData = utils.createJjimData(getGoodsData, jjimData.length + 1);
  jjimData.push(inserData);
  res.json(jjimData);
});

router.post("/logout", function(req, res, next){
  res.json({ test: "success" });
});

module.exports = router;
