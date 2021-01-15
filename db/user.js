const connection = require("./connection");
const mysql = require("mysql2");

async function getPoint(req) {
  let [rows, fields] = await connection.query(
    `SELECT point FROM user WHERE id=${req.user.id}`
  );
  return rows;
}

async function getHistory(req) {
  let [rows, fields] = await connection.query(
    `SELECT * FROM project INNER JOIN history ON project.id=history.project_id WHERE user_id=${req.user.id} ORDER BY DATE`
  );
  return rows;
}

async function getCart(req) {
  let [rows, fields] = await connection.query(
    `SELECT *,cart.id as cart_id FROM project INNER JOIN cart ON project.id=cart.project_id WHERE user_id=${req.user.id}`
  );
  return rows;
}

async function addCart({ date, money, project_id, user_id }) {
  const query = mysql.format("INSERT INTO cart SET ?", {
    date,
    money,
    project_id,
    user_id,
  });
  let [rows, fields] = await connection.query(query);
  return rows;
}

async function editCart(req) {
  const query = mysql.format(
    `UPDATE cart SET money=${req.body.data.point} WHERE id = ${req.body.data.cartId}`
  );
  let [rows, fields] = await connection.query(query);
  return rows;
}

async function deleteCart(req) {
  const query = mysql.format(`DELETE FROM cart WHERE id = ${req.body.cartId}`);
  let [rows, fields] = await connection.query(query);
  return rows;
}

module.exports = {
  getPoint,
  getHistory,
  getCart,
  addCart,
  editCart,
  deleteCart,
};
