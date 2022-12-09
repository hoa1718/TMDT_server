const sql = require("mssql");
const properties = require("../config/properties");



const getGiaoHang = async (req, res, next) => {
  const rows = await sql.query`select hd.IdHoaDon,hd.NgayMua,ht.TenHinhThuc,tt.DiaChi,tt.SDT,tk.IdTaiKhoan,tk.TenKhachHang,hd.TenKhachNoLog,SDTNoLog, sum(ct.SoLuong) as TongSL, sum(ct.SoLuong*ct.DonGiaBan) as Tong
  from HoaDon hd, ThongTinNhanHang tt,TaiKhoan tk,HinhThucThanhToan ht, CTHoaDon ct
  where hd.DiaChiNhan = tt.IdDiaChi and hd.IdTaiKhoan = tk.IdTaiKhoan and hd.IdHinhThuc = ht.IdHinhThuc and hd.IdHoaDon = ct.IdHoaDon
  and hd.TrangThaiDonHang = 1 and hd.TrangThaiGiaoHang = 0
  group by hd.IdHoaDon,hd.NgayMua,ht.TenHinhThuc,tt.DiaChi,tt.SDT,tk.TenKhachHang,hd.TenKhachNoLog,SDTNoLog,tk.IdTaiKhoan`;
  for (let hd of rows.recordset) {
    const ctRows =
      await sql.query`select sp.IdSanPham,sp.Ten, ct.SoLuong,ct.DonGiaBan, sum(ct.SoLuong*ct.DonGiaBan) as Tong
      from CTHoaDon ct, SanPham sp
      where ct.IdSp = sp.IdSanPham and ct.IdHoaDon = ${hd.IdHoaDon}
      group by sp.Ten, ct.SoLuong,ct.DonGiaBan,sp.IdSanPham`;
    const CT = ctRows.recordset;
    hd.CT = CT;
  }
  res.send({data: rows.recordset });
};

const giaoThanhCong = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  const CT = data.CT
  const Tong = data.Tong;
  const IdTk = data.IdTaiKhoan;
  // console.log("Tong",Tong);
  // console.log("IdTK",IdTk);
  // console.log(data.Tong/100000);
  // console.log("id success:",id);
  // console.log("data",data);


  sql.query`update HoaDon
  set TrangThaiGiaoHang =1
  where IdHoaDon = ${id}`

  for(let i of CT)
  {
    sql.query`update SanPham
              set SLBan= SLBan + ${i.SoLuong} where IdSanPham = ${i.IdSanPham}`
  }
 
    sql.query`update TaiKhoan
              set DiemThuong = DiemThuong + (${Tong}/100000) where IdTaiKhoan = ${data.IdTaiKhoan}`


  res.send({status: "ok"})
};

const giaoThatBai = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  const CT = data.CT
  console.log("id fail:",id);
  console.log("data",data);

  await sql.query`update HoaDon
  set TrangThaiDonHang =-1 , TrangThaiGiaoHang = -1
  where IdHoaDon = ${id}`
  for(let i of CT) 
  {
   await sql.query`update SanPham
              set SoLuong = SoLuong + ${i.SoLuong} where IdSanPham = ${i.IdSanPham}`
  }

  res.send({status: "ok"})
};

const handleDate = (date, time) => {
  if (!date) return false;
  if (time) return `${date} ${time}:00:00`;
  return `${date}`;
};

const searchGiaoHang = async (req, res, next) => {
  const data = req.query;
  console.log("idquery:", data);
  const dateTime = handleDate(data.date, data.time);
  const queryTime = dateTime ? ` and hd.NgayMua = '${dateTime}'` : ''
  const queryId = data.id ? ` and hd.IdHoaDon =${data.id}` : ''

 
  const rows =
    await sql.query(`select hd.TrangThaiDonHang,hd.TrangThaiGiaoHang, hd.IdHoaDon,hd.NgayMua,ht.TenHinhThuc,tt.DiaChi,tt.SDT,tk.IdTaiKhoan,tk.TenKhachHang,hd.TenKhachNoLog,SDTNoLog, sum(ct.SoLuong) as TongSL, sum(ct.SoLuong*ct.DonGiaBan) as Tong
  from HoaDon hd, ThongTinNhanHang tt,TaiKhoan tk,HinhThucThanhToan ht, CTHoaDon ct
  where hd.DiaChiNhan = tt.IdDiaChi and hd.IdTaiKhoan = tk.IdTaiKhoan and hd.IdHinhThuc = ht.IdHinhThuc and hd.IdHoaDon = ct.IdHoaDon
  and hd.TrangThaiDonHang = 1 and hd.TrangThaiGiaoHang = 0 ${queryTime} ${queryId} 
  group by hd.IdHoaDon,hd.NgayMua,ht.TenHinhThuc,tt.DiaChi,tt.SDT,tk.TenKhachHang,hd.TenKhachNoLog,SDTNoLog,hd.TrangThaiDonHang,hd.TrangThaiGiaoHang,tk.IdTaiKhoan`);
  for (let hd of rows.recordset) {
    const ctRows =
      await sql.query`select sp.IdSanPham, sp.Ten, ct.SoLuong,ct.DonGiaBan, sum(ct.SoLuong*ct.DonGiaBan) as Tong
      from CTHoaDon ct, SanPham sp
      where ct.IdSp = sp.IdSanPham and ct.IdHoaDon = ${hd.IdHoaDon}
      group by sp.Ten, ct.SoLuong,ct.DonGiaBan,sp.IdSanPham`;
    const CT = ctRows.recordset;
    hd.CT = CT;
  }
  res.send({ data: rows.recordset });
};




module.exports = {
  getGiaoHang,
  giaoThanhCong,
  giaoThatBai,
  searchGiaoHang,
};
