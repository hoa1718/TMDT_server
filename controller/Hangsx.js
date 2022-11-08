const sql = require("mssql");
const properties = require("../config/properties");

const getHang = async (req, res, next) => {
  const rows = await sql.query`select h.IdHangSx,h.Ten,Count(*) as SoSP from HangSx h, SanPham sp where h.IdHangSx=sp.IdHangSx group by h.IdHangSx, h.Ten`;
  res.send({ data: rows.recordset });
};

module.exports = {
    getHang,
};
