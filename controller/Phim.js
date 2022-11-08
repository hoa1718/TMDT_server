const sql = require("mssql");
const properties = require("../config/properties");

const getPhim = async (req, res, next) => {
  const rows = await sql.query`select p.IdPhim,p.TenPhim,p.MoTa,p.IdLoai,COUNT(*) as SoSP from Phim p ,SanPham sp where p.IdPhim=sp.IdPhim group by p.IdPhim,p.TenPhim,p.MoTa,p.IdLoai`;
  res.send({ data: rows.recordset });
};

module.exports = {
  getPhim,
};
