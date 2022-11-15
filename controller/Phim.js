const sql = require("mssql");
const properties = require("../config/properties");

const getPhim = async (req, res, next) => {
  const rows = await sql.query`select p.IdPhim,p.TenPhim,p.MoTa,p.IdLoai,COUNT(*) as SoSP from Phim p ,SanPham sp where p.IdPhim=sp.IdPhim group by p.IdPhim,p.TenPhim,p.MoTa,p.IdLoai`;
  res.send({ data: rows.recordset });
};
const getPhimAdmin = async (req, res, next) => {
  const rows = await sql.query`select * from Phim P, PhanLoai PL WHERE P.IdLoai = PL.Id`;
  res.send({ data: rows.recordset });
};
const postPhimAdmin = async (req, res, next) => {
  const data = req.body;
  // console.log(data);
  console.log("Data insert:",data);

  await sql.query`insert into Phim (TenPhim,Mota,IdLoai) values (${data.TenPhim},null,${data.TheLoai})`;
};

module.exports = {
  getPhim,
  getPhimAdmin,
  postPhimAdmin,
};
