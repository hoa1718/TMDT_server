const hoaDonRouter = require("./HoaDon");
const giaoHangRouter = require("./GiaoHang");
const khachHangRouter = require("./KhachHang");
const sanPhamRouter = require("./SanPham");
const phimRouter = require("./Phim");
const hangRouter = require("./Hangsx");
const loginRouter = require("./Login");
const phanLoaiRouter = require("./PhanLoai");
const thanhToanRouter = require("./HinhThucThanhToan")
const nhapRouter = require("./NhapHang")
const ttRouter = require("./ThongTinCuaHang")
const tkRouter = require("./ThongKe")
const theLoaiRouter = require("./TheLoai")
// const loginRouter= require("./Login")
const loginAdminRouter = require("./LoginAdmin")
function route(app){
    app.use("/HoaDon",hoaDonRouter);
    app.use("/GiaoHang",giaoHangRouter);
    app.use("/KhachHang",khachHangRouter);
    app.use("/SanPham",sanPhamRouter);
    app.use("/Phim",phimRouter);    
    app.use("/Hang",hangRouter);
    app.use("/NhapHang",nhapRouter);
    app.use("/PhanLoai",phanLoaiRouter);
    app.use("/ThongTinCuaHang",ttRouter);
    app.use("/ThongKe",tkRouter);
    app.use("/HinhThucThanhToan",thanhToanRouter);
    app.use("/TheLoai",theLoaiRouter);
    app.use("/Login",loginRouter);
    app.use("/LoginAdmin",loginAdminRouter);


}
module.exports = route;