import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const ConnectDB = () => {
  const API_URI = process.env.API_URI;
  mongoose.connect(API_URI).then(() => console.log("Da ket noi Connected!"));
};
export default ConnectDB;
