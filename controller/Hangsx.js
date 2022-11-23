const sql = require("mssql");
const properties = require("../config/properties");

const getHang = async (req, res, next) => {
  const rows = await sql.query`select h.IdHangSx,h.TenHang,Count(*) as SoSP from HangSx h, SanPham sp where h.IdHangSx=sp.IdHangSx group by h.IdHangSx, h.TenHang`;
  res.send({ data: rows.recordset });
};
const getHangAdmin = async (req, res, next) => {
  const rows = await sql.query`select * from HangSx`;
  res.send({ data: rows.recordset });
};
const postHang = async (req, res, next) =>{
  const data = req.body;
  console.log(data);
  await sql.query`insert into HangSx(TenHang) values (${data.TenHang})`
  
}

module.exports = {
    getHang,
    postHang,
    getHangAdmin,
};
