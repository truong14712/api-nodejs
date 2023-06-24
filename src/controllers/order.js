import Order from "../models/order.js";

export const addOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getAllOrder = async (req, res) => {
  try {
    const order = await Order.find();
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).send({
      messenger: error,
    });
  }
};
export const getOneOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).send({
      messenger: error,
    });
  }
};
export const updateStatus = async (req, res) => {
  try {
    const { status, _id } = req.body;
    const order = await Order.findById(_id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Cập nhật trạng thái mới cho sản phẩm
    order.status = status;

    // Lưu giỏ hàng đã cập nhật
    await order.save();

    return res.json({
      message: "updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
