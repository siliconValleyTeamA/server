var express = require("express");
var router = express.Router();

const userData = require("../mocks/user.json");

router.get("/point", async function (req, res, next) {
  res.json(userData);
});

module.exports = router;
