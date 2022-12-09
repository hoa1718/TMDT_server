const sql = require("mssql");
const listType = {
  1: { TrangThaiGiaoHang: 0, TrangThaiDonHang: 0 },
  2: { TrangThaiGiaoHang: 1, TrangThaiDonHang: 1 },
  3: { TrangThaiGiaoHang: -1, TrangThaiDonHang: -1 },
};
const create = async (req, res, next) => {
  try {
    const request = await req.body;
    let address = {};
    let billCreate;
    await compareQuantity(request.Cart).then((a) => {
      if (a === false) {
        return res.status(400).send({
          message: "Số lượng tồn không đủ!",
        });
      }
    });
    addressId(request.User.IdTaiKhoan, request.DiaChi).then((a) => {
      address = a;
    });
    if (request.User !== undefined) {
      const rows =
        await sql.query`insert into HoaDon(IdTaiKhoan,TrangThaiGiaoHang,NgayMua,IdHinhThuc,DiemSuDung,TrangThaiDonHang,DiaChiNhan)
                                       values( ${
                                         request.User.IdTaiKhoan
                                       },${Number(0)},${new Date(
          request.NgayMua
        )},${request.IdHinhThuc},${request.DiemSuDung},${Number(0)},${
          request.DiaChi
        })`;
      billCreate =
        await sql.query`select IdHoaDon from HoaDon where IdTaiKhoan=${
          request.User.IdTaiKhoan
        } and NgayMua=${new Date(request.NgayMua)}`;
        usedPoint(request.User.IdTaiKhoan, request.DiemSuDung);
    } else {
      const rows =
        await sql.query`insert into HoaDon(IdTaiKhoan,TrangThaiGiaoHang,NgayMua,IdHinhThuc,DiemSuDung,TrangThaiDonHang)
                                      values( ${Number(2)},${Number(
          0
        )},${new Date(request.NgayMua)},${request.IdHinhThuc},${
          request.DiemSuDung
        },${Number(0)})`;
      billCreate =
        await sql.query`select IdHoaDon from HoaDon where IdTaiKhoan=${Number(
          2
        )} and NgayMua=${new Date(request.NgayMua)}`;
        await sql.query`insert into ThongTinNhanHang(IdKhachHang,DiaChi,SDT,DiaChiMacDinh,HoTenNguoiNhan) values(2,${request.DiaChi},${request.Sdt},1,${request.TenNguoiNhan})`;
        const newAddress= sql.query`select * from ThongTinNhanHang where IdKhachHang=2 and DiaChi=${request.DiaChi} and SDT=${request.Sdt}`;
        console.log((await newAddress).recordset[0]);
    }
    request.Cart.map(async (item, i) => {
      const row =
        await sql.query`insert into CTHoaDon(IdHoaDon,IdSp,SoLuong,DonGiaBan) values(${
          billCreate.recordset[0].IdHoaDon
        },${item.IdSanPham},${item.Quantity},${Number(
          item.GiaNhap * 1.4
        )}) update SanPham set SoLuong -= ${item.Quantity} where IdSanPham= ${
          item.IdSanPham
        }`;
    });
    
    res.send({ message: "Yes" });
  } catch (err) {
    console.log(err);
    res.send("Không thành công!");
  }
};
const compareQuantity = async (cart) => {
  for (let i = 0; i < cart.length; i++) {
    const product =
      await sql.query`select * from SanPham where IdSanPham=${cart[i].IdSanPham}`;
    if (Number(cart[i].Quantity) > Number(product.recordset[0].SoLuong)) {
      console.log(
        Number(cart[i].Quantity),
        Number(product.recordset[0].SoLuong)
      );
      return false;
    }
  }
  return true;
};
const usedPoint = async (id, point) => {
  const row =
    await sql.query`update TaiKhoan set DiemThuong-=${point}  where IdTaiKhoan=${id}`;
};
const addressId = async (id, address) => {
  const row =
    await sql.query`select * from ThongTinNhanHang where IdKhachHang=${id} and DiaChi=${address}`;
  return row.recordset[0];
};
const getHoaDon = async (req, res, next) => {
  const type = req.params.type;
  const q = listType[type];

  const rows =
    await sql.query`select hd.TrangThaiDonHang,hd.TrangThaiGiaoHang, hd.IdHoaDon,hd.NgayMua,ht.TenHinhThuc,tt.DiaChi,tt.SDT,tt.IdKhachHang,tt.HoTenNguoiNhan,tk.TenKhachHang,hd.TenKhachNoLog,SDTNoLog, sum(ct.SoLuong) as TongSL, sum(ct.SoLuong*ct.DonGiaBan) as Tong
  from HoaDon hd, ThongTinNhanHang tt,TaiKhoan tk,HinhThucThanhToan ht, CTHoaDon ct
  where hd.DiaChiNhan = tt.IdDiaChi and hd.IdTaiKhoan = tk.IdTaiKhoan and hd.IdHinhThuc = ht.IdHinhThuc and hd.IdHoaDon = ct.IdHoaDon
  and hd.TrangThaiDonHang = ${q.TrangThaiDonHang} and hd.TrangThaiGiaoHang = ${q.TrangThaiGiaoHang}
  group by hd.IdHoaDon,hd.NgayMua,ht.TenHinhThuc,tt.DiaChi,tt.SDT,tk.TenKhachHang,hd.TenKhachNoLog,SDTNoLog,hd.TrangThaiDonHang,hd.TrangThaiGiaoHang,tt.IdKhachHang,tt.HoTenNguoiNhan`;
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
  const data = req.body;
  const CT = data.CT
  console.log("data",data);
  console.log("CT",CT);
  console.log("id:", id);

  sql.query`update HoaDon
    set TrangThaiDonHang =-1, TrangThaiGiaoHang =-1
    where IdHoaDon = ${id}`;
  for(let i of CT) 
  {
   await sql.query`update SanPham
              set SoLuong = SoLuong + ${i.SoLuong} where IdSanPham = ${i.IdSanPham}`
  }


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
  const queryTime = dateTime ? ` and hd.NgayMua = '${dateTime}'` : "";
  const queryId = data.id ? ` and hd.IdHoaDon =${data.id}` : "";
  const type = data.type;
  const q = listType[Number.parseInt(type)];

  const rows =
    await sql.query(`select hd.TrangThaiDonHang,hd.TrangThaiGiaoHang, hd.IdHoaDon,hd.NgayMua,ht.TenHinhThuc,tt.DiaChi,tt.SDT,tk.TenKhachHang,hd.TenKhachNoLog,SDTNoLog, sum(ct.SoLuong) as TongSL, sum(ct.SoLuong*ct.DonGiaBan) as Tong
  from HoaDon hd, ThongTinNhanHang tt,TaiKhoan tk,HinhThucThanhToan ht, CTHoaDon ct
  where hd.DiaChiNhan = tt.IdDiaChi and hd.IdTaiKhoan = tk.IdTaiKhoan and hd.IdHinhThuc = ht.IdHinhThuc and hd.IdHoaDon = ct.IdHoaDon
  and hd.TrangThaiDonHang = ${q.TrangThaiDonHang} and hd.TrangThaiGiaoHang = ${q.TrangThaiGiaoHang} ${queryTime} ${queryId} 
  group by hd.IdHoaDon,hd.NgayMua,ht.TenHinhThuc,tt.DiaChi,tt.SDT,tk.TenKhachHang,hd.TenKhachNoLog,SDTNoLog,hd.TrangThaiDonHang,hd.TrangThaiGiaoHang`);
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
const getHoaDonWUser = async (req, res, next) => {
  const rows =
    await sql.query`select * from HoaDon where IdTaiKhoan=${req.params.id}`;
  res.send({ data: rows.recordset });
};
const getHoaDonDetail = async (req, res, next) => {
  const rows =
    await sql.query`select * from CTHoaDon where IdHoaDon=${req.params.id}`;
  const product =
    await sql.query`select s.* from SanPham as s,CTHoaDon as c where s.IdSanPham=c.IdSp and c.IdHoaDon=${req.params.id}`;
  res.send({ data: rows.recordset, product: product.recordset });
};
module.exports = {
  create,
  getHoaDon,
  chapNhanDonHang,
  huyDonHang,
  searchHoaDon,
  getHoaDonWUser,
  getHoaDonDetail,
};
