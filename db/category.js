const connection = require("./connection");
const mysql = require("mysql2");

//카테고리 조회
async function getCategory() {
  let [rows, fields] = await connection.query(`SELECT * FROM category`);
  return rows;
}

module.exports = { getCategory };
