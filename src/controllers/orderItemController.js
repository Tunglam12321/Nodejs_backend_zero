// controllers/orderController.js

const OrderItemModel = require("../models/OrderItem");

const getOrderByOrder = async (req, res) => {
  try {
    const order_id = req.params.id;
    const entries = await OrderItemModel.getOrderItemByOrder(order_id);
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getOrderItemByUser = async (req, res) => {
  try {
    const order_id = req.user.sub.id;
    const entries = await OrderItemModel.getOrderItemByOrder(order_id);
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getOrderItemById = async (req, res) => {
  const orderItemIds = req.params.id;
  try {
    const orderItem = await OrderItemModel.getOrderItemById(orderItemIds);

    if (!orderItem) {
      return res.status(404).json({ error: "OrderItem not found" });
    }

    res.json(orderItem);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createOrderItem = async (req, res) => {
  const orderData = req.body;
  // Kiểm tra tồn tại và định dạng của dữ liệu đầu vào
  if (
    !orderData ||
    !orderData.order_id ||
    !orderData.book_id ||
    !orderData.quantity ||
    !orderData.price ||
    !orderData.saleOff_code
  ) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  try {
    const newOrderId = await OrderItemModel.createOrderItem(orderData);
    res.json({ id: newOrderId, message: "OrderItem created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateOrderItem = async (req, res) => {
  const orderItemId = req.params.id; // Lấy ID người dùng từ thông tin xác thực (ví dụ: JWT token)
  const data = req.body; // Lấy thông tin cập nhật từ phần thân yêu cầu
  try {
    // Thực hiện cập nhật thông tin người dùng trong cơ sở dữ liệu
    await OrderItemModel.updateOrderItem(orderItemId, data);

    res.json({ message: "OrderItem Book information updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteOrderItem = async (req, res) => {
  const orderItemId = req.params.id; // Lấy ID người dùng từ thông tin xác thực (ví dụ: JWT token)

  try {
    // Thực hiện cập nhật thông tin người dùng trong cơ sở dữ liệu
    await OrderItemModel.deleteOrderItem(orderItemId);

    res.json({ message: "Delete orderItem successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteAllOrderItem = async (req, res) => {
  const orderItemId = req.params.id; // Lấy ID người dùng từ thông tin xác thực (ví dụ: JWT token)

  try {
    // Thực hiện cập nhật thông tin người dùng trong cơ sở dữ liệu
    await OrderItemModel.deleteAllOrderItem(orderItemId);

    res.json({ message: "Delete order successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  getOrderByOrder,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
  deleteAllOrderItem,
  getOrderItemByUser,
};
