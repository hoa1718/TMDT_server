const sql = require("mssql");
const properties = require("../config/properties");

const getLoai = async (req, res, next) => {
  const rows = await sql.query`select * from PhanLoai`;
  res.send({ data: rows.recordset });
};

module.exports = {
  getLoai,
};
