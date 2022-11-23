const sql = require("mssql");
class Controller {
  async create(req, res, next) {
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
}
module.exports = new Controller();
