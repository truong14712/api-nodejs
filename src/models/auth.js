import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    default: "member",
  },
  phoneNumber: {
    type: Number,
    require: true,
  },
});
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};
export default mongoose.model("users", userSchema);
