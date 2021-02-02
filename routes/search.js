var express = require("express");
var router = express.Router();
const client = require('./server.client');
// const { getCategory } = require("../db/category");

//모든 카테고리 조회
router.post("/", async function (req, res, next) {
  //console.log(req.body);
//   console.log(res.json(client.search({index:"title",body:req.body})))
    return client.search({index: 'title', body: req.body})
});

module.exports = router;
