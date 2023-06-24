import express from "express";
import {
  addOrder,
  getAllOrder,
  getOneOrder,
  updateStatus,
} from "../controllers/order.js";
const router = express.Router();
router.post("/", addOrder);
router.get("/", getAllOrder);
router.get("/:id", getOneOrder);
router.patch("/updateStatus", updateStatus);

export default router;
