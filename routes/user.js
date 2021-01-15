var express = require("express");
var router = express.Router();

const userData = require("../mocks/user.json");
const goodsData = require("../mocks/goods.json");
const { getPoint, addProjectCart } = require("../db/user");

let cartList = [];
let jjimList = [{ id: 1 }, { id: 2 }];

router.get("/point", async function (req, res, next) {
  req.user = {
    id: 1,
  };
  const rows = await getPoint(req);
  res.json(rows[0].point);
});

router.post("/cart", async function (req, res, next) {
  const money = parseInt(req.body.money.replace(/,/g, ""));
  const project_id = parseInt(req.body.projectId);

  await addProjectCart({
    date: new Date(),
    money: money,
    project_id: project_id,
    user_id: 1,
  });
  res.json({ success: true });
});

router.delete("/jjim", function (req, res, next) {
  const projectId = req.body.projectId;
  jjimList = jjimList.filter((jjim) => jjim.id != projectId);
  res.json(jjimList);
});

module.exports = router;
