import express from "express";
import {
  getAllBlog,
  addBlog,
  getOneBlog,
  deleteBlog,
  updateBlog,
} from "../controllers/blogs";
const route = express.Router();
route.get("", getAllBlog);
route.get("/:id", getOneBlog);
route.post("/", addBlog);
route.delete("/:id", deleteBlog);
route.put("/:id", updateBlog);
export default route;
