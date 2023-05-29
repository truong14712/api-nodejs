import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    require: true,
    minLength: 6,
  },
  price: {
    type: Number,
    require: true,
    minLength: 2,
  },
  image: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
    minLength: 5,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
  },
});
productSchema.plugin(mongoosePaginate);
export default mongoose.model("products", productSchema);
