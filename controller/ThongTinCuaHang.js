const sql = require('mssql');
const properties = require("../config/properties");

const getThongTin = async (req,res,next) => {
    const rows = await sql.query`select * from ThongTinCuaHang`;

    // for(let tt of rows.recordset){
    //     const addressRows = await sql.query`select * from ThongTinCuaHang`;
    //     const address = addressRows.recordset;
    //     tt.address = address;
    // } 
    res.send({ data: rows.recordset });
}

const updateThongTin = async (req,res,next) => {
    const data =req.body;
    // console.log(data);

    // res.json({messsage:"ok"})
    console.log("Data update:", id,data);

  await sql.query`update  ThongTinCuaHang set DiaChi=${data.daichi},SDT=${data.sdt},TkNganHang=${data.tk},TenNganHang=${data.nganhang}
                  ,Mail=${data.mail}
                  where IDCuaHang=1`;


  res.send({ data: "ok" });

}

module.exports ={
getThongTin,
updateThongTin,
}