var express = require("express");
var router = express.Router();
const client = require('./server.client');
// const { getCategory } = require("../db/category");


client.ping({
    requestTimeout: 30000,
  }, function (error) {
    error
      ? console.error('ElasticSearch cluster is down!')
      : console.log('ElasticSearch is ok');
  });


function ElasticSearchClient(body) {
    // perform the actual search passing in the index, the search query and the type
    //console.log(JSON.parse(body.search));
    
  return client.search({index: 'project', body: body});
}

//모든 카테고리 조회
router.post("/", async function (req, res, next) {
  console.log(req.body);
  //console.log(client.search({index: 'title', body: `"${req.body.search}"`}))
  ElasticSearchClient(req.body).then((result)=>{res.json(result.hits.hits);}); 
});



// function ElasticSearchClient(body) {
//     // perform the actual search passing in the index, the search query and the type
//     console.log(client.search({index: 'title', body: body}));
// }

module.exports = router;
