const sql = require("mssql");
const properties = require("../config/properties");

const getHang = async (req, res, next) => {
  const rows = await sql.query`select * from HangSx`;
  res.send({ data: rows.recordset });
};

module.exports = {
    getHang,
};
