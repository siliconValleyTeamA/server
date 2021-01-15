const connection = require("./connection");
const mysql = require("mysql2");

async function getCategory() {
  let [rows, fields] = await connection.query(`SELECT * FROM category`);
  return rows;
}

module.exports = { getCategory };
