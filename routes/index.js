const hoaDonRouter = require("./HoaDon");
const khachHangRouter = require("./KhachHang");
const sanPhamRouter = require("./SanPham");
const phimRouter = require("./Phim");
const hangRouter = require("./Hangsx");
const loginRouter = require("./Login");

function route(app){
    app.use("/HoaDon",hoaDonRouter);
    app.use("/KhachHang",khachHangRouter);
    app.use("/SanPham",sanPhamRouter);
    app.use("/Phim",phimRouter);    
    app.use("/Hang",hangRouter);
    app.use("/Login",loginRouter);

}
module.exports = route;