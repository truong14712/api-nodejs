import express from "express";
import {
  getAllProduct,
  getOneProduct,
  addProduct,
  deleteProduct,
  updateProduct,
  searchProduct,
} from "../controllers/product.js";
import multer from "multer";
const upload=multer({dest:"../tmp"})
const route = express.Router();
// /api/products/search?name=<tên sản phẩm>&minPrice=<giá tối thiểu
route.get("/products/search", searchProduct);
route.get("/products", getAllProduct);
route.get("/product/:id", getOneProduct);
route.post("/product/add",upload.single("image"), addProduct);
route.delete("/product/delete/:id", deleteProduct);
route.put("/product/update/:id", updateProduct);
export default route;
