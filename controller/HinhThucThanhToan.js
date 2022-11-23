const sql = require("mssql");
const properties = require("../config/properties");

const getThanhToan = async (req, res, next) => {
  const rows = await sql.query`select * from HinhThucThanhToan`;
  res.send({ data: rows.recordset });
};

module.exports = {
  getThanhToan,
};
