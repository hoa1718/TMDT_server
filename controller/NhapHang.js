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
const getSearchPhieuNhap = async (req, res, next) => {
  const data = req.query
  console.log(data);
  const NgayNhap = data.ngayNhap ? `and p.NgayNhap = '${data.ngayNhap}'` : ''
  const rows =
    await sql.query(`select p.IdPhieuNhap,p.NgayNhap,Count(ct.IdSanPham) as SL,Sum(ct.DonGiaNhap*ct.SoLuong) as Tong from PhieuNhap p,CTPhieuNhap ct where p.IdPhieuNhap=ct.IdPhieuNhap ${NgayNhap} group by p.IdPhieuNhap,p.NgayNhap
    `);

    for(let phieu of rows.recordset){
     
      const danhSP = await sql.query`select SanPham.Ten, CTPhieuNhap.* from CTPhieuNhap, SanPham where IdPhieuNhap = ${phieu.IdPhieuNhap} and CTPhieuNhap.IdSanPham = SanPham.IdSanPham`;
      phieu.Details = danhSP.recordset;
    }
  res.send({ data: rows.recordset });
};
const createPhieuNhap = async (req, res, next) => {
  const data = req.body
  console.log("PhieuNhap",data);
  const date = data.NgayNhap
  const dataCt = data.getData

  await sql.query(`insert into PhieuNhap (NgayNhap) values('${date}')`)
  
  const lastId = await sql.query(`select Max(IdPhieuNhap) as lastId from PhieuNhap`)
  console.log("lastId",lastId.recordset[0].lastId);
  const Id = lastId.recordset[0].lastId

  for(let i of dataCt)
  {
    await sql.query(`insert into CTPhieuNhap (IdPhieuNhap,IdSanPham,SoLuong,DonGiaNhap) values(${Id},${i.IDNguyenLieu},${i.SoLuong},${i.GiaNhap})`)
    await sql.query`update SanPham set SoLuong=SoLuong+${i.SoLuong} where IdSanPham=${i.IDNguyenLieu}`
  }

};

module.exports = {
  getPhieuNhap,
  createPhieuNhap,
  getSearchPhieuNhap
};
