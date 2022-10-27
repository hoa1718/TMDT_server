const hoaDonRouter = require("./HoaDon");
const khachHangRouter = require("./KhachHang");
const sanPhamRouter = require("./SanPham");

function route(app){
    app.use("/HoaDon",hoaDonRouter);
    app.use("/KhachHang",khachHangRouter);
    app.use("/SanPham",sanPhamRouter);
}
module.exports = route;