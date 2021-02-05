var express = require("express");
var router = express.Router();
const client = require("./server.client");

client.ping(
  {
    requestTimeout: 30000,
  },
  function (error) {
    error
      ? console.error("ElasticSearch cluster is down!")
      : console.log("ElasticSearch is ok");
  }
);

function ElasticSearchClient(body) {
  return client.search({ index: "project_detail", body: body });
}

//모든 카테고리 조회
router.post("/", async function (req, res, next) {
  ElasticSearchClient(req.body).then((result) => {
    res.json(result.hits.hits);
  });
});

module.exports = router;
