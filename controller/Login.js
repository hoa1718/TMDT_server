const sql = require("mssql");
const bcrypt= require('bcrypt')
class loginController{
    async authentication(req,res,next){
        try{
            const data= await req.body
            let row= await sql.query`select * from TaiKhoan where TenDangNhap =${data.username}`;
            if(row.rowsAffected==0){
               res.send("Không tồn tại tài khoản này")
            }
            bcrypt.hash(data.password, 10, function(err, hash) {
                if (err) { throw (err); }
            
                bcrypt.compare(row.recordset[0].MatKhau, hash, function(err, result) {
                    console.log(hash);
                    console.log(row.recordset[0].MatKhau);
                    if (err) { throw (err); }
                    console.log(result);
                });
            });
            const match= await bcrypt.compareSync(row.recordset[0].MatKhau,data.password)
            console.log(match);
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
        }
        catch (err) {
            console.log(err);
            res.send("Không thành công!");
          }
    }  
}
module.exports = new loginController();
