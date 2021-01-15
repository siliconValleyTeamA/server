var express = require('express');
var router = express.Router();
const utils = require('../utils.js');

const userData = require("../mocks/user.json");
const goodsData = require("../mocks/goods.json");
const historyData = require("../mocks/history.json");
const jjimData = require("../mocks/jjim.json");
const cartData = require('../mocks/cart.json');

let cartList = [];
let jjimList = [{ id: 1 }, { id: 2 }];

router.get('/point', function (req, res, next) {
  res.json(userData);
});

router.delete('/jjim', function (req, res, next) {
  const projectId = req.body.projectId;
  jjimList = jjimList.filter((jjim) => jjim.id != projectId);
  res.json(jjimList);
});

router.get('/carts', function (req, res, next) {
  res.json(cartList);
});

router.post('/carts', function (req, res, next) {
  const projectId = parseInt(req.body.projectId, 10);
  const insertData = goodsData.find((goods) => goods.id === projectId);
  cartData.push(insertData);
  res.json({ success: true });
});

router.delete('/carts', function (req, rest, next) {
  const projectId = parseInt(req.body.projectId, 10);
  const goodsIdx = cartData.findIndex((goods) => goods.id === projectId);
  if (goodsIdx === -1) {
    return res.status(404).josn({ error: 'Unknown goods' });
  }
  cartData.splice(goodsIdx, 1);
  res.json({ success: true });
});

router.put('/carts', function (req, res, next) {
  const projectId = parseInt(req.body.projectId, 10);
  const changeData = cartData.find((goods) => goods.id === projectId);
  changeData.point = req.body.point;
  res.json({ success: true });
});

router.get('/jjim', async function (req, res, next) {
  var sortjjimData = jjimData.sort(utils.sortByJjimTime);
  res.json(sortjjimData);
});

router.post('/jjim', function (req, res, next) {
  const projectId = req.body.projectId;
  const getGoodsData = goodsData.find((goods) => goods.id == projectId);
  const inserData = utils.createJjimData(getGoodsData, jjimData.length + 1);
  jjimData.push(inserData);
  res.json(jjimData);
});

router.post('/logout', function (req, res, next) {
  res.json({ test: 'success' });
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