const sql = require("mssql");
const properties = require("../config/properties");

const ThongKe = (fromDay, toDay) => {
  if (fromDay && toDay) {
    return `and hd.NgayMua between '${fromDay}' and '${toDay}' `;
  }
  if (fromDay && !toDay) {
    return `and hd.NgayMua between '${fromDay}' and getDate() `;
  }

  return "";
};

const getThongKe = async (req, res, next) => {
  const data = req.query;
  console.log(data);
  const date = ThongKe(data.fromDay,data.toDay);
  console.log(date);
  const type = data.type && Number.parseInt(data.type)
  const isType = type&&` and hd.IdHinhThuc = ${type}`

  const rows = await sql.query(`select sum(ct.SoLuong*ct.DonGiaBan) as Tong
  from HoaDon hd , CTHoaDon ct 
  where hd.IdHoaDon = ct.IdHoaDon ${date} ${isType} `);
  res.send({ data: rows.recordset });
};
const getThongKeThang = async (req, res, next) => {

  const rows = await sql.query`SELECT MONTH(hd.NgayMua) as "Thang", SUM(ct.SoLuong*ct.DonGiaBan) AS "Tong"
  FROM HoaDon hd,CTHoaDon ct
  where hd.IDHoaDon= ct.IDHoaDon and Month(hd.NgayMua )= Month(SYSDATETIME())
  Group By  MONTH(hd.NgayMua) `;
  res.send({ data: rows.recordset });
};

const getThongKeNgay = async (req, res, next) => {

  const rows = await sql.query`SELECT hd.NgayMua as "Ngay", SUM(ct.SoLuong*ct.DonGiaBan) AS "Tong"
  FROM HoaDon hd,CTHoaDon ct
  where hd.IDHoaDon= ct.IDHoaDon and hd.NgayMua = CONVERT (date, SYSDATETIME())
  Group By hd.NgayMua `;
  res.send({ data: rows.recordset });
};

const getDonHangChuaXuLy = async (req, res, next) => {

  const rows = await sql.query`select count(IdHoaDon) as Num from HoaDon where TrangThaiDonHang =0 and TrangThaiGiaoHang =0 `;
  res.send({ data: rows.recordset });
};

const getDonHangHomNay = async (req, res, next) => {

  const rows = await sql.query`Select COUNT(IDHoaDon) as Hoadon from HoaDon where NgayMua  = CONVERT (date, SYSDATETIME())`;
  res.send({ data: rows.recordset });
};
const getTop10 = async (req, res, next) => {

  const rows = await sql.query`select top 10 *  from SanPham order by SLBan desc`;
  res.send({ data: rows.recordset });
};
module.exports = {
  getThongKe,
  getThongKeThang,
  getThongKeNgay,
  getDonHangChuaXuLy,
  getDonHangHomNay,
  getTop10,
};
