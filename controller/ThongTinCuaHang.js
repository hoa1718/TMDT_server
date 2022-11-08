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

module.exports ={
getThongTin,
}