const sql = require("mssql");

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
const getKhachHangWID = async (req, res, next) => {
  const rows =
    await sql.query`select * from TaiKhoan where IdTaiKhoan=${req.params.id}`;
  // for (let kh of rows.recordset) {
  //   const addressRows =
  //     await sql.query`select IdDiaChi,DiaChi,SDT,DiaChiMacDinh from ThongTinNhanHang where IdKhachHang =${kh.IdTaiKhoan}`;
  //   const address = addressRows.recordset;
  //   kh.address = address;
  // }
  res.send({ data: rows.recordset });
};

const getSearchKhachHang = async (req, res, next) => {
  const data = req.query;
  console.log("id", data.id);

  const id = data.id ? ` where TenKhachHang like '%${data.id}%'` : "";
  console.log("Name", id);
  const rows = await sql.query(`select * from TaiKhoan ${id} `);

  for (let kh of rows.recordset) {
    const addressRows =
      await sql.query`select IdDiaChi,DiaChi,SDT,DiaChiMacDinh from ThongTinNhanHang where IdKhachHang =${kh.IdTaiKhoan}`;
    const address = addressRows.recordset;
    kh.address = address;
  }
  res.send({ data: rows.recordset });
  // res.send('ok');
};

const updateKhachHang = async (req, res, next) => {
  const id = req.params.id;

  const data = req.body;

  console.log("Data update:", id, data);

  await sql.query`update TaiKhoan set TenDangNhap=${data.TenTk},MatKhau=${data.MatKhau},TenKhachHang=${data.Ten},TrangThai=${data.KhoaTk}
                  ,ChucVu=${data.ChucVu},Email=${data.Email},NgaySinh=${data.NgaySinh}
                  where IdTaiKhoan=${id}`;

  res.send({ data: "ok" });
};
const getDiaChi = async (req, res, next) => {
  const id = req.params.id;
  const rows =
    await sql.query` select * from ThongTinNhanHang where IdKhachHang=${id}`;
  res.send({ data: rows.recordset });
};
const changePassword = async (req, res, next) => {
  try {
    const request = await req.body;
    sql.query`update TaiKhoan set MatKhau=${request.password} where IdTaiKhoan=${request.id}`;
    res.send("Yes");
  } catch (err) {
    console.log(err);
    res.send("No");
  }
};
const updateAddress = async (req, res, next) => {
  try {
    const request = await req.body;
    console.log(request);
    sql.query`update ThongTinNhanHang set HoTenNguoiNhan=${request.TenNguoiNhan},DiaChi=${request.DiaChi},SDT=${request.SDT} where IdDiaChi=${request.ID}`;
    res.send("Yes");
  } catch (err) {
    console.log(err);
    res.send("No");
  }
};
const createAddress = async (req, res, next) => {
  try {
    const request = await req.body;
    console.log(request);
    sql.query`insert into ThongTinNhanHang(IdKhachHang,DiaChi,SDT,DiaChiMacDinh,HoTenNguoiNhan) values(${request.User},${request.DiaChi},${request.SDT},0,${request.TenNguoiNhan})`;
    res.send("Yes");
  } catch (err) {
    console.log(err);
    res.send("No");
  }
};
const changeInfo = async (req, res, next) => {
  try {
    const request = await req.body;
    sql.query`update TaiKhoan set TenKhachHang=${request.name},NgaySinh=${request.birth},Email=${request.email} where IdTaiKhoan=${request.id}`;
    res.send("Yes");
  } catch (err) {
    console.log(err);
    res.send("No");
  }
};
module.exports = {
  getKhachHang,
  getKhachHangWID,
  updateKhachHang,
  getSearchKhachHang,
  getDiaChi,
  changePassword,
  changeInfo,
  updateAddress,
  createAddress,
};
