import express from "express";
import {
  signup,
  signin,
  request_refreshToken,
  updatePassword,
} from "../controllers/auth.js";
import { checkPermission } from "../middlewares/checkPermission.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/refresh", request_refreshToken);
router.put("/update-user-password", checkPermission, updatePassword);
export default router;
