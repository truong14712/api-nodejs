import express from "express";
import { checkPermission } from "../middlewares/checkPermission";

import {
  getAllCategory,
  getOneCategory,
  addCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/categories";

const route = express.Router();
route.get("/", getAllCategory);
route.get("/:id", getOneCategory);
route.post("/", checkPermission,addCategory);
route.delete("/:id", checkPermission,deleteCategory);
route.put("/:id", checkPermission,updateCategory);
export default route;
