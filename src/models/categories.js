import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  products: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
});
export default mongoose.model("categories", categorySchema);
