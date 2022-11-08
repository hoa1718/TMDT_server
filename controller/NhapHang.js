const sql = require("mssql");
const properties = require("../config/properties");

const getPhieuNhap = async (req, res, next) => {
  const rows =
    await sql.query`select p.IdPhieuNhap,p.NgayNhap,Count(ct.IdSanPham) as SL,Sum(ct.DonGiaNhap*ct.SoLuong) as Tong from PhieuNhap p,CTPhieuNhap ct where p.IdPhieuNhap=ct.IdPhieuNhap group by p.IdPhieuNhap,p.NgayNhap
    `;

    for(let phieu of rows.recordset){
     
      const danhSP = await sql.query`select SanPham.Ten, CTPhieuNhap.* from CTPhieuNhap, SanPham where IdPhieuNhap = ${phieu.IdPhieuNhap} and CTPhieuNhap.IdSanPham = SanPham.IdSanPham`;
      phieu.Details = danhSP.recordset;
    }
  res.send({ data: rows.recordset });
};

module.exports = {
  getPhieuNhap,
};
