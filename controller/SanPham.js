const sql = require("mssql");
const properties = require("../config/properties");

const getSanPham = async (req, res, next) => {
  const rows =
    await sql.query`select sp.Ten,sp.IdSanPham,sp.ChieuCao,sp.ChieuDai,sp.ChieuRong,sp.IdHangSx,sp.IdPhim,sp.SoLuong,sp.TrongLuong,sp.An,p.TenPhim,l.TenLoai,h.Ten,
    (select top 1 DonGiaNhap from CTPhieuNhap ct,PhieuNhap p where ct.IdPhieuNhap=p.IdPhieuNhap and ct.IdSanPham= sp.IdSanPham order by p.NgayNhap DeSC) as GiaNhap
    from SanPham sp, Phim p,HangSx h,PhanLoai l
    where sp.IdPhim = p.IdPhim and p.IdLoai= l.Id and sp.IdHangSx = h.IdHangSx `;

    
  // for (let sp of rows.recordset) {
  //   const giaRows =
  //     await sql.query`select max(DonGiaNhap) from CTPhieuNhap where IdSanPham =${sp.IdSanPham}`;
  //   const donGia = giaRows.recordset;
  // }

  //   sp.images = images.map((img) => {
  //     img.HinhAnh = properties.IMAGE_URL + "/" + img.HinhAnh;
  //     return img;
  //   });

  await res.send({ data: rows.recordset });
};
const search = async (req, res, next) => {
  const search  = req.params.search

  console.log(search);
  const param = '%'+search+'%'
  const rows =
    await sql.query`select sp.Ten,sp.IdSanPham,sp.ChieuCao,sp.ChieuDai,sp.ChieuRong,sp.IdHangSx,sp.IdPhim,sp.SoLuong,sp.TrongLuong,sp.An,p.TenPhim,l.TenLoai,h.Ten as TenHang
    from SanPham sp, Phim p,HangSx h,PhanLoai l
    where sp.IdPhim = p.IdPhim and sp.Ten like ${param} and p.IdLoai= l.Id and sp.IdHangSx = h.IdHangSx  `;

  res.send({ data: rows.recordset });
};
const getChiTiet = async (req, res, next) => {
  const id = req.params.id;
  const rows =
    await sql.query`select * from SanPham,Phim,HangSx where SanPham.IdPhim = Phim.IdPhim and SanPham.IdHangSx = HangSx.IdHangSx and SanPham.IdSanPham = ${id}`;

  for (let sp of rows.recordset) {
    const imageRows =
      await sql.query`select * from HinhAnhSp where IdSp =${sp.IdSanPham}`;
    const images = imageRows.recordset;

    sp.images = images.map((img) => {
      img.HinhAnh = properties.IMAGE_URL + "/" + img.HinhAnh;
      return img;
    });
  }

  res.send({ data: rows.recordset[0] });
};
const updateSanPham = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body

  console.log("Data update:", id,data);

  await sql.query`update SanPham set Ten=${data.TenSp},TrongLuong=${data.TrongLuong},IdHangSx=${data.IdHang},IdPhim=${data.IdPhim}
                  ,ChieuCao=${data.ChieuCao},ChieuDai=${data.ChieuDai},ChieuRong=${data.ChieuRong},An=${data.An}
                  where IdSanPham=${id}`;


  res.send({ data: "ok" });
};
const createSanPham = async (req, res, next) => {
  const data = req.body

  console.log("Data create:", data);

  const rows = await sql.query`insert into SanPham (Ten,TrongLuong,IdHangsx,IdPhim,ChieuCao,ChieuDai,ChieuRong,SLBan,NgayDang,An,SoLuong) 
                                values  (${data.TenSp},${data.TrongLuong},${data.IdHang},${data.IdPhim},${data.ChieuCao},${data.ChieuDai},${data.ChieuRong},0,GETDATE(),0,1)`;

  const lastId = await sql.query`SELECT Max(IdSanPham) as LastId FROM SanPham`
  console.log(lastId);
  res.send({ data: lastId.recordset[0].LastId });
};

const searchSp = async (req, res, next) => {
  const search  = req.params.searchSp
  console.log(search);
  const param = '%'+search+'%'
  const rows =
    await sql.query`select sp.IdSanPham,sp.Ten
    from SanPham sp
    where sp.Ten like ${param} `;

  res.send({ data: rows.recordset });
};

module.exports = {
  getSanPham,
  getChiTiet,
  updateSanPham,
  createSanPham,
  search,
  searchSp,

};
