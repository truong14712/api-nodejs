import jwt from "jsonwebtoken";
import ModelUser from "../models/auth";
import dotenv from "dotenv";
dotenv.config();

/**
 * B1: Check xem user có đăng nhập hay không bằng cách check xem có Autho không?
 * B2: Lấy jwt từ autho
 * B3: Lấy _id từ jwt
 * B4: Lấy user từ database với _id đã tìm được
 * B5: Check role của user đã lấy được (nếu là admin -> next, không phải admin -> throw Errors)
 *
 */
const { ACCESS_TOKEN } = process.env;
export const checkPermission = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    // kiểm tra xem user có đăng nhập không
    if (!authHeader) {
      return res.status(403).json({
        message: "Bạn chưa đăng nhập",
      });
    }
    // lấy jwt token từ header
    const token = authHeader && authHeader.split(" ")[1];
    // xác thực jwt token
    await jwt.verify(token, ACCESS_TOKEN, async (err, payload) => {
      if (err === "JsonWebTokenError") {
        return res.status(400).json({
          message: "Token không hợp lệ",
        });
      }
      // console.log(err);
      // console.log(payload);
      if (err === "TokenExpireError") {
        return res.status(400).json({
          message: "Token hết hạn",
        });
      }
      const user = await ModelUser.findById(payload._id);
      if (!user) {
        return res.status(400).json({
          message: "Không tìm thấy user",
        });
      }
      // kiểm tra xem user có quyền admin không
      if (user.role !== "admin") {
        return res.status(403).json({
          message: "Bạn không có quyền truy cập tài nguyên!",
        });
      }
      req.user = user;
    });
    // lưu thông tin user vào request để sử dụng cho các middleware khác
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
