const sql = require("mssql");
const properties = require("../config/properties");

const getTheLoai = async (req, res, next) => {
  const rows = await sql.query`select * from PhanLoai`;
  res.send({ data: rows.recordset });
}
const postTheLoai = async (req, res, next) => {
  const data = req.body
  console.log(data);
  await sql.query`insert into PhanLoai(TenLoai) values(${data.TenLoai})`;
}
module.exports = {
    getTheLoai,
    postTheLoai,
    
};
