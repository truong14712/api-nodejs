"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _product = require("../controllers/product.js");
var _multer = _interopRequireDefault(require("multer"));
var upload = (0, _multer["default"])({
  dest: "../tmp"
});
var route = _express["default"].Router();
// /api/products/search?name=<tên sản phẩm>&minPrice=<giá tối thiểu
route.get("/products/search", _product.searchProduct);
route.get("/products", _product.getAllProduct);
route.get("/product/:id", _product.getOneProduct);
route.post("/product/add", upload.single("image"), _product.addProduct);
route["delete"]("/product/delete/:id", _product.deleteProduct);
route.put("/product/update/:id", _product.updateProduct);
var _default = route;
exports["default"] = _default;