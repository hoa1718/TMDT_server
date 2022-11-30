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
const getSearchKhachHang = async (req, res, next) => {
  const data = req.query
  console.log("id", data.id);

  const id = data.id ? ` where TenKhachHang like '%${data.id}%'` : ''
  console.log('Name',id);
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
  
  const data = req.body

  console.log("Data update:", id,data);

  await sql.query`update TaiKhoan set TenDangNhap=${data.TenTk},MatKhau=${data.MatKhau},TenKhachHang=${data.Ten},TrangThai=${data.KhoaTk}
                  ,ChucVu=${data.ChucVu},Email=${data.Email},NgaySinh=${data.NgaySinh}
                  where IdTaiKhoan=${id}`;


  res.send({ data: "ok" });
};
const getDiaChi = async (req,res,next)=>{
  const id=req.params.id;
  const rows= await sql.query` select * from ThongTinNhanHang where IdKhachHang=${id}`
  res.send({data:rows.recordset})
}


module.exports = {
    getKhachHang,
    updateKhachHang,
    getSearchKhachHang,
    getDiaChi
};