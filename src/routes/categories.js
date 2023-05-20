import express from "express";
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
route.post("/", addCategory);
route.delete("/:id", deleteCategory);
route.put("/:id", updateCategory);
export default route;
