import express from "express";
import {
  getAllProduct,
  getOneProduct,
  addProduct,
  deleteProduct,
  updateProduct,
  searchProduct,
} from "../controllers/product.js";
const route = express.Router();
// /api/products/search?name=<tên sản phẩm>&minPrice=<giá tối thiểu
route.get("/products/search", searchProduct);
route.get("/products", getAllProduct);
route.get("/product/:id", getOneProduct);
route.post("/product/add", addProduct);
route.delete("/product/delete/:id", deleteProduct);
route.put("/product/update/:id", updateProduct);
export default route;
