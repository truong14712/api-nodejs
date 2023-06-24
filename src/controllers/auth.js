import ModelUser from "../models/auth.js";
import { SigninSchema, SignupSchema } from "../schemas/auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
/**
 * B1: Tạo router mới routes/auth.js, add router vào trong app.js
 * B2: Tạo controller mới (signin với phương thức post)
 *  -
 * B3: Validation req.body với Joi -> tách riêng thành schemas/auth.js
 */
/**
 * B1: lấy ra req.body và dùng Joi validation
 * B2: Nếu validate lỗi thì trả về lỗi.
 * B3: Check xem email đã có trong hệ thống hay chưa bằng findOne({})
 * B4: Mã hoá password bằng bcryptjs
 * B5: Lưu dữ liệu vào database bằng model User.create()
 * B6: Xoá password và trả thông tin về cho người dùng.
 */
const { ACCESS_TOKEN, REFRESH_TOKEN } = process.env;
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await ModelUser.findOne({ email });
    const { error } = SignupSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(404).json({
        message: errors,
      });
    }
    if (userExists) {
      return res.status(404).json({
        message: "Email đã tồn tại",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await ModelUser.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ _id: user._id }, ACCESS_TOKEN, {
      expiresIn: "5m",
    });
    // Xoá bỏ password trước khi gửi lại thông báo phía client
    user.password = undefined;
    return res.status(200).json({
      message: "Người dùng đã tạo thành công",
      accessToken: token,
      user,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = SigninSchema.validate(
      {
        email,
        password,
      },
      { abortEarly: false }
    );
    if (error) {
      const errors = error.details.map((error) => error.message);
      return res.status(404).json({
        message: errors,
      });
    }
    const user = await ModelUser.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Tài khoản không tồn tại",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({
        message: "Mật khẩu không đúng",
      });
    }
    const token = jwt.sign({ _id: user._id, email: user.email }, ACCESS_TOKEN, {
      expiresIn: "5m",
    });
    const refreshToken = jwt.sign(
      { _id: user._id, email: user.email },
      REFRESH_TOKEN,
      {
        expiresIn: "5h",
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    user.password = undefined;
    return res.status(200).json({
      status: 200,
      message: "Đăng nhập thành công",
      accessToken: token,
      user,
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const request_refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(403).json({
      message: "Bạn chưa đăng nhập",
    });
  }
  jwt.verify(refreshToken, REFRESH_TOKEN, async (err, user) => {
    if (err) {
      return res.status(404).json({
        message: err,
      });
    }
    const newAccessToken = await jwt.sign(
      { _id: user._id, email: user.email },
      REFRESH_TOKEN,
      {
        expiresIn: "5m",
      }
    );
    const newRefreshToken = await jwt.sign(
      { _id: user._id, email: user.email },
      REFRESH_TOKEN,
      {
        expiresIn: "5h",
      }
    );
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    return res.status(200).json({
      accessToken: newAccessToken,
    });
  });
};
const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const user = await ModelUser.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(oldPassword);
    if (isPasswordMatched) {
      return res.status(404).send("Old password is incorrect!");
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).send("Password doesn't matched with each other!");
    }
    user.password = newPassword;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Password updated successfully!",
      user,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
export { signup, signin, request_refreshToken, updatePassword };
