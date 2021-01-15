const connection = require("./connection");
const mysql = require("mysql2");

async function getPoint(req) {
  let [rows, fields] = await connection.query(
    `SELECT point FROM user WHERE id=${req.user.id}`
  );
  return rows;
}

async function addProjectCart({ date, money, project_id, user_id }) {
  const query = mysql.format("INSERT INTO cart SET ?", {
    date,
    money,
    project_id,
    user_id,
  });
  let [rows, fields] = await connection.query(query);
  return rows;
}

module.exports = {
  getPoint,
  addProjectCart,
};
