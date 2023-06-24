import express from "express";
import routerCategory from "./categories.js";
import routerProduct from "./products.js";
import routerBlogs from "./blogs.js";
import routerAuth from "./auth.js";
import routerOrder from "./order.js";

const router = express.Router();

router.use("/blogs", routerBlogs);
router.use("/categories", routerCategory);
router.use("", routerProduct);
router.use("/auth", routerAuth);
router.use("/orders", routerOrder);
export default router;
