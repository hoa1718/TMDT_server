const sql = require("mssql");
const properties = require("../config/properties");

const getPhim = async (req, res, next) => {
  const rows = await sql.query`select * from Phim`;
  res.send({ data: rows.recordset });
};

module.exports = {
  getPhim,
};
