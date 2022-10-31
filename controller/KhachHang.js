const sql = require("mssql");
const properties = require("../config/properties");

const getKhachHang = async (req, res, next) => {
  const rows = await sql.query`select * from TaiKhoan`;

  for (let kh of rows.recordset) {
    const addressRows =
      await sql.query`select IdDiaChi,DiaChi,SDT,DiaChiMacDinh from ThongTinNhanHang where IdKhachHang =${kh.IdTaiKhoan}`;
    const address = addressRows.recordset;
    kh.address = address;
  }
  res.send({ data: rows.recordset });
};

const updateKhachHang = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body

  console.log("Data update:", id,data);

  await sql.query`update TaiKhoan set TenDangNhap=${data.TenTk},MatKhau=${data.MatKhau},TenKhachHang=${data.Ten},TrangThai=${data.KhoaTk}
                  ,ChucVu=${data.ChucVu},Email=${data.Email},NgaySinh=${data.NgaySinh}
                  where IdTaiKhoan=${id}`;


  res.send({ data: "ok" });
};


module.exports = {
    getKhachHang,
    updateKhachHang,
};