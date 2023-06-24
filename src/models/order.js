import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
  products: [
    {
      productId: {
        type: String,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: Number,
    require: true,
  },
  deliveryAddress: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: [1, 2, 3],
    default: 1,
  },
  payment: {
    type: String,
    require: true,
  },
  total: {
    type: Number,
    require: true,
  },
});
export default mongoose.model("order", orderSchema);
