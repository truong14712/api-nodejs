import express from "express";
import { signup, signin, request_refreshToken } from "../controllers/auth.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/refresh", request_refreshToken);
export default router;
