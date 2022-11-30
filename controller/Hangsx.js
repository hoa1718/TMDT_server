const sql = require("mssql");
const properties = require("../config/properties");

const getHang = async (req, res, next) => {
  const rows = await sql.query`select h.IdHangSx,h.Ten,Count(*) as SoSP from HangSx h, SanPham sp where h.IdHangSx=sp.IdHangSx group by h.IdHangSx, h.Ten`;
  res.send({ data: rows.recordset });
};
const getHangAdmin = async (req, res, next) => {
  const rows = await sql.query`select * from HangSx`;
  res.send({ data: rows.recordset });
};
const postHang = async (req, res, next) =>{
  const data = req.body;
  console.log(data);
  await sql.query`insert into HangSx(Ten) values (${data.Ten})`
  
}

module.exports = {
    getHang,
    postHang,
    getHangAdmin,
};
