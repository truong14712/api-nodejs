import express from "express";
import { checkPermission } from "../middlewares/checkPermission";
import {
  getAllProduct,
  getOneProduct,
  addProduct,
  deleteProduct,
  updateProduct,
  searchProduct,
} from "../controllers/product";
const route = express.Router();
// /api/products/search?name=<tên sản phẩm>&minPrice=<giá tối thiểu
route.get("/products/search", searchProduct);
route.get("/products", getAllProduct);
route.get("/product/:id", getOneProduct);
route.post("/product/add", checkPermission, addProduct);
route.delete("/product/delete/:id", checkPermission, deleteProduct);
route.put("/product/update/:id", checkPermission, updateProduct);
export default route;
