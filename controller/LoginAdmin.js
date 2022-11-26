const sql = require("mssql");
const bcrypt= require('bcrypt')
var jwt = require('jsonwebtoken');

class loginController{
    async login(req,res,next){
        try{
            const data= await req.body

            console.log("data",data);
            let row= await sql.query`select * from TaiKhoan where TenDangNhap =${data.username} and ChucVu = 1`;
            console.log("row",row);
            
            if(row.rowsAffected==0){
               return res.status(500).json("Không tồn tại tài khoản này")
               
            }

            const match = row.recordset[0].MatKhau===data.password
            if(!match)
             return res.status(500).json("Không tồn tại tài khoản này")
             var token = jwt.sign(row.recordset[0], 'shhhhh');


            console.log(match,row.recordset[0].MatKhau,data.password);
            return res.json({message: "Ok", data: {user:row.recordset[0], token}})
        }
        catch (err) {
            console.log(err);
            res.status(500).json("Không thành công!");
          }
        
    }
    async validate(req,res,next){
        try{
            const token = req.headers.authorization
            console.log("Token",token);
            const data = jwt.decode(token)
            if(!data){
                return res.status(500).json("Token khong dung");
            }
            next()
        }
        catch (err) {
            console.log(err);
            res.status(500).json("Token khong dung");
          }
        
    }
    // async registration(req,res,next){
    //     try{
    //         const data= await req.body
    //         console.log(req.body);
    //     }
    //     catch (err) {
    //         console.log(err);
    //         res.send("Không thành công!");
    //       }
    // }  
}
module.exports = new loginController();
