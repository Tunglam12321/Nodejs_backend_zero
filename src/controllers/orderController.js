// controllers/orderController.js

const OrderModel = require("../models/OrderModel");

const getAllOrder = async (req, res) => {
  try {
    const entries = await OrderModel.getAllOrder();
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getOrderById = async (req, res) => {
  const orderIds = req.params.id;
  try {
    const order = await OrderModel.getOrderById(orderIds);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getOrderByUser = async (req, res) => {
  const userIds = req.params.id;
  try {
    const order = await OrderModel.getOrderByUser(userIds);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getOrderUser = async (req, res) => {
  const userIds = req.user.sub.id;
  try {
    const order = await OrderModel.getOrderByUser(userIds);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const createOrder = async (req, res) => {
  const orderData = req.body;
  // Kiểm tra tồn tại và định dạng của dữ liệu đầu vào
  if (
    !orderData ||
    !orderData.order_date ||
    !orderData.total_amount ||
    !orderData.status ||
    !orderData.user_id
  ) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  try {
    const newOrderId = await OrderModel.createOrder(orderData);
    res.json({ id: newOrderId, message: "Order created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateOrder = async (req, res) => {
  const orderId = req.params.id; // Lấy ID người dùng từ thông tin xác thực (ví dụ: JWT token)
  const data = req.body; // Lấy thông tin cập nhật từ phần thân yêu cầu
  try {
    // Thực hiện cập nhật thông tin người dùng trong cơ sở dữ liệu
    await OrderModel.updateOrder(orderId, data);

    res.json({ message: "Order Book information updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteOrder = async (req, res) => {
  const orderId = req.params.id; // Lấy ID người dùng từ thông tin xác thực (ví dụ: JWT token)

  try {
    // Thực hiện cập nhật thông tin người dùng trong cơ sở dữ liệu
    await OrderModel.deleteOrder(orderId);

    res.json({ message: "Delete order successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllOrder,
  deleteOrder,
  updateOrder,
  createOrder,
  getOrderById,
  getOrderByUser,
  getOrderUser,
};
