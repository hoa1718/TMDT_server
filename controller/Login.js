const sql = require("mssql");
const bcrypt= require('bcrypt')
class loginController{
    async authentication(req,res,next){
        try{
            const data= await req.body
            let row= await sql.query`select * from TaiKhoan where TenDangNhap =${data.username}`;
            setTimeout(()=>{
                if(row.rowsAffected==0){
                    res.send("Không tồn tại tài khoản này")
                 }
                 else if(data.password!==row.recordset[0].MatKhau){
                     res.send("Sai tài khoản hoặc mật khẩu")
                 }
                 else{
                     res.send(row.recordset[0])
                 }
            },3000);
           
        }
        catch (err) {
            console.log(err);
            res.send("Không thành công!");
          }
        
    }
    async registration(req,res,next){
        try{
            const data= await req.body
            console.log(req.body);
            let row= await sql.query`select * from TaiKhoan where TenDangNhap =${data.username} or Email=${data.email}` ;
            if(row.rowsAffected>0){
                res.send("Đã tồn tại tài khoản hoặc email này")
            }
            else{
                let row = await sql.query`insert into TaiKhoan (TenDangNhap,MatKhau,Email) values (${data.username},${data.password},${data.email})`
                res.send("Đăng ký thành công")
            }
        }
        catch (err) {
            console.log(err);
            res.send("Không thành công!");
          }
    }  
}
module.exports = new loginController();
