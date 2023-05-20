import Joi from "joi";

const SignupSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().required().messages({
    "string.email": "Email không hợp lệ",
    "string.empty": "Email không được để trống",
    "any.required": "Trường email là bắt buộc",
  }),
  password: Joi.string().required().min(6).messages({
    "string.empty": "Password không được để trống",
    "any.required": "Trường password là bắt buộc",
    "string.min": "Password phải có ít nhất {#limit} ký tự",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Password không khớp",
    "string.empty": "Confirm password không được để trống",
    "any.required": "Trường confirm password là bắt buộc",
  }),
});
const SigninSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email không hợp lệ",
    "string.empty": "Email không được để trống",
    "any.required": "Trường email là bắt buộc",
  }),
  password: Joi.string().required().min(6).messages({
    "string.empty": "Password không được để trống",
    "string.min": "Password phải có ít nhất {#limit} ký tự",
    "any.required": "Trường password là bắt buộc",
  }),
});

export { SignupSchema, SigninSchema };
