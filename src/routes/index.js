import express from "express";
import routerCategory from "./categories";
import routerProduct from "./products";
import routerBlogs from "./blogs";
import routerAuth from "./auth";

const router = express.Router();

router.use("/blogs", routerBlogs);
router.use("/categories", routerCategory);
router.use("", routerProduct);
router.use("/auth", routerAuth);
export default router;
