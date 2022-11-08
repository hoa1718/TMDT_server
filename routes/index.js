const hoaDonRouter = require("./HoaDon");
const giaoHangRouter = require("./GiaoHang");
const khachHangRouter = require("./KhachHang");
const sanPhamRouter = require("./SanPham");
const phimRouter = require("./Phim");
const phanLoaiRouter = require("./PhanLoai");
const hangRouter = require("./Hangsx")
const nhapRouter = require("./NhapHang")
const ttRouter = require("./ThongTinCuaHang")
const tkRouter = require("./ThongKe")
const thanhToanRouter = require("./HinhThucThanhToan")

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
}
module.exports = route;