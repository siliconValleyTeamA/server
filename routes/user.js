var express = require("express");
var router = express.Router();

const {
  getPoint,
  getInvestment,
  addInvestment,
  getCart,
  addCart,
  editCart,
  deleteCart,
  chargePoint,
  getJjim,
  addJjim,
  deleteJjim,
} = require("../db/user");

router.get("/", function (req, res, next) {
  res.json(req.user);
});

//포인트 조회
router.get("/point", async function (req, res, next) {
  const rows = await getPoint(req);
  res.json(rows[0].point);
});

//포인트 충전
router.put("/point", async function (req, res, next) {
  await chargePoint(req);
  res.json({ success: true });
});

//펀딩 내역 조회
router.get("/investment", async function (req, res, next) {
  const rows = await getInvestment(req);
  res.json(rows);
});

//펀딩 내역 추가
router.post("/investment", async function (req, res, next) {
  const point = parseInt(req.body.point.replace(/,/g, ""));
  const projectId = parseInt(req.body.projectId);
  await addInvestment({
    investment_date: new Date(),
    money: point,
    projectId: projectId,
    userId: req.user.id,
  });
  res.json({ success: true });
});

//카트 조회
router.get("/carts", async function (req, res, next) {
  const rows = await getCart(req);
  res.json(rows);
});

//카트 추가
router.post("/carts", async function (req, res, next) {
  const money = parseInt(req.body.money.replace(/,/g, ""));
  const projectId = parseInt(req.body.projectId);
  await addCart({
    cart_date: new Date(),
    money: money,
    money_scale: "$",
    projectId: projectId,
    userId: req.user.id,
  });
  res.json({ success: true });
});

//카트 수정
router.put("/carts", async function (req, res, next) {
  const money = parseInt(req.body.money.replace(/,/g, ""));
  const cartId = req.body.cartId;
  await editCart({ money, cartId });
  res.json({ success: true });
});

//카트 삭제
router.delete("/carts", async function (req, res, next) {
  await deleteCart(req);
  res.json({ success: true });
});

//찜 조회
router.get("/jjim", async function (req, res, next) {
  const rows = await getJjim(req);
  res.json(rows);
});

//찜 추가
router.post("/jjim", async function (req, res, next) {
  const projectId = req.body.projectId;
  const userId = req.user.id;
  await addJjim({
    jjim_date: new Date(),
    investment: "N",
    projectId: projectId,
    userId: userId,
  });
  res.json({ success: true });
});

//찜 삭제
router.delete("/jjim", async function (req, res, next) {
  await deleteJjim(req);
  res.json({ success: true });
});

module.exports = router;
