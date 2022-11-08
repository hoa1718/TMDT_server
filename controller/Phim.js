const sql = require("mssql");
const properties = require("../config/properties");

const getPhim = async (req, res, next) => {
  const rows = await sql.query`select * from Phim`;
  for (let ph of rows.recordset) {
    const addressRows =
      await sql.query`select TenPhim,MoTa,IdLoai from Phim where IdPhim =${ph.IdPhim}`;
    const address = addressRows.recordset;
    ph.address = address;
  }
  res.send({ data: rows.recordset });
};

module.exports = {
  getPhim,
};
