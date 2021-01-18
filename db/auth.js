const connection = require("./connection");
const mysql = require("mysql2");

//사용자 조회
async function findUser({ name, github_id }) {
  let [rows, fields] = await connection.query(
    `SELECT * FROM user WHERE name="${name}" AND github_id="${github_id}"`
  );
  return rows;
}

//사용자 생성
async function createUser({ name, github_id, image }) {
  const query = mysql.format("INSERT INTO user SET ?", {
    name,
    point: 10000,
    image,
    type: 0,
    github_id,
  });
  let [rows, fields] = await connection.query(query);
  return rows;
}

module.exports = {
  findUser,
  createUser,
};
