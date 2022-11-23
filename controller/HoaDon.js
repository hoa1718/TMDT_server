const sql = require("mssql");

const listType = {
  1: { TrangThaiGiaoHang: 0, TrangThaiDonHang: 0 },
  2: { TrangThaiGiaoHang: 1, TrangThaiDonHang: 1 },
  3: { TrangThaiGiaoHang: -1, TrangThaiDonHang: -1 },
};
const create = async(req, res, next)=> {
  try {
    const request = await req.body;
    let billCreate;
    console.log(request);
    if(request.User !==undefined){
        const rows =
       await sql.query`insert into HoaDon(IdTaiKhoan,TrangThaiGiaoHang,NgayMua,IdHinhThuc,DiemSuDung,TrangThaiDonHang)
                                       values( ${
                                         request.User.IdTaiKhoan
                                       },${Number(0)},${
        new Date(request.NgayMua)
      },${request.IdHinhThuc},${request.DiemSuDung},${Number(0)})`;
      billCreate = await sql.query`select IdHoaDon from HoaDon where IdTaiKhoan=${request.User.IdTaiKhoan} and NgayMua=${new Date(request.NgayMua)}`
    }
    else{
      const rows =
      await sql.query`insert into HoaDon(IdTaiKhoan,TrangThaiGiaoHang,NgayMua,IdHinhThuc,DiemSuDung,TrangThaiDonHang)
                                      values( ${
                                        Number(2)
                                      },${Number(0)},${
       new Date(request.NgayMua)
     },${request.IdHinhThuc},${request.DiemSuDung},${Number(0)})`;
     billCreate = await sql.query`select IdHoaDon from HoaDon where IdTaiKhoan=${Number(2)} and NgayMua=${new Date(request.NgayMua)}`
    }
    console.log(billCreate);

      
  } catch (err) {
    console.log(err);
    res.send("Không thành công!");
  }
}
const getHoaDon = async (req, res, next) => {
  const type = req.params.type;
  const q = listType[type];

  const rows =
    await sql.query`select hd.TrangThaiDonHang,hd.TrangThaiGiaoHang, hd.IdHoaDon,hd.NgayMua,ht.TenHinhThuc,tt.DiaChi,tt.SDT,tk.TenKhachHang,hd.TenKhachNoLog,SDTNoLog, sum(ct.SoLuong) as TongSL, sum(ct.SoLuong*ct.DonGiaBan) as Tong
  from HoaDon hd, ThongTinNhanHang tt,TaiKhoan tk,HinhThucThanhToan ht, CTHoaDon ct
  where hd.DiaChiNhan = tt.IdDiaChi and hd.IdTaiKhoan = tk.IdTaiKhoan and hd.IdHinhThuc = ht.IdHinhThuc and hd.IdHoaDon = ct.IdHoaDon
  and hd.TrangThaiDonHang = ${q.TrangThaiDonHang} and hd.TrangThaiGiaoHang = ${q.TrangThaiGiaoHang}
  group by hd.IdHoaDon,hd.NgayMua,ht.TenHinhThuc,tt.DiaChi,tt.SDT,tk.TenKhachHang,hd.TenKhachNoLog,SDTNoLog,hd.TrangThaiDonHang,hd.TrangThaiGiaoHang`;
  for (let hd of rows.recordset) {
    const ctRows =
      await sql.query`select sp.Ten, ct.SoLuong,ct.DonGiaBan, sum(ct.SoLuong*ct.DonGiaBan) as Tong
      from CTHoaDon ct, SanPham sp
      where ct.IdSp = sp.IdSanPham and ct.IdHoaDon = ${hd.IdHoaDon}
      group by sp.Ten, ct.SoLuong,ct.DonGiaBan`;
    const CT = ctRows.recordset;
    hd.CT = CT;
  }
  res.send({ data: rows.recordset });
};

const chapNhanDonHang = async (req, res, next) => {
  const id = req.params.id;
  console.log("id:", id);

  sql.query`update HoaDon
    set TrangThaiDonHang =1
    where IdHoaDon = ${id}`;

  res.send({ status: "ok" });
};

const huyDonHang = async (req, res, next) => {
  const id = req.params.id;
  console.log("id:", id);

  sql.query`update HoaDon
    set TrangThaiDonHang =-1, TrangThaiGiaoHang =-1
    where IdHoaDon = ${id}`;

  res.send({ status: "ok" });
};

const handleDate = (date, time) => {
  if (!date) return false;
  if (time) return `${date} ${time}:00:00`;
  return `${date}`;
};

const searchHoaDon = async (req, res, next) => {
  const data = req.query;
  console.log("idquery:", data);
  const dateTime = handleDate(data.date, data.time);
  const queryTime = dateTime ? ` and hd.NgayMua = '${dateTime}'` : ''
  const queryId = data.id ? ` and hd.IdHoaDon =${data.id}` : ''
  const type = data.type;
  const q = listType[Number.parseInt(type)];

  const rows =
    await sql.query(`select hd.TrangThaiDonHang,hd.TrangThaiGiaoHang, hd.IdHoaDon,hd.NgayMua,ht.TenHinhThuc,tt.DiaChi,tt.SDT,tk.TenKhachHang,hd.TenKhachNoLog,SDTNoLog, sum(ct.SoLuong) as TongSL, sum(ct.SoLuong*ct.DonGiaBan) as Tong
  from HoaDon hd, ThongTinNhanHang tt,TaiKhoan tk,HinhThucThanhToan ht, CTHoaDon ct
  where hd.DiaChiNhan = tt.IdDiaChi and hd.IdTaiKhoan = tk.IdTaiKhoan and hd.IdHinhThuc = ht.IdHinhThuc and hd.IdHoaDon = ct.IdHoaDon
  and hd.TrangThaiDonHang = ${q.TrangThaiDonHang} and hd.TrangThaiGiaoHang = ${
      q.TrangThaiGiaoHang
    } ${queryTime} ${queryId} 
  group by hd.IdHoaDon,hd.NgayMua,ht.TenHinhThuc,tt.DiaChi,tt.SDT,tk.TenKhachHang,hd.TenKhachNoLog,SDTNoLog,hd.TrangThaiDonHang,hd.TrangThaiGiaoHang`);
  for (let hd of rows.recordset) {
    const ctRows =
      await sql.query`select sp.Ten, ct.SoLuong,ct.DonGiaBan, sum(ct.SoLuong*ct.DonGiaBan) as Tong
      from CTHoaDon ct, SanPham sp
      where ct.IdSp = sp.IdSanPham and ct.IdHoaDon = ${hd.IdHoaDon}
      group by sp.Ten, ct.SoLuong,ct.DonGiaBan`;
    const CT = ctRows.recordset;
    hd.CT = CT;
  }
  res.send({ data: rows.recordset });
};

module.exports = {
  create,
  getHoaDon,
  chapNhanDonHang,
  huyDonHang,
  searchHoaDon,
};
