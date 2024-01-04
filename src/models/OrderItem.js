// OrderModel.js

const db = require("../config/database");

const getOrderItemById = async (order_item_id) => {
  try {
    const [rows, fields] = await db.execute(
      "SELECT * FROM order_items WHERE order_item_id = ?",
      [order_item_id]
    );
    return rows[0];
  } catch (error) {
    throw error;
  }
};
const getOrderItemByOrder = async (order_id) => {
  try {
    const [rows, fields] = await db.execute(
      "SELECT * FROM order_items WHERE order_id = ?",
      [order_id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};
const createOrderItem = async (OrderItemData) => {
  try {
    const [result] = await db.execute(
      "INSERT INTO order_items (order_id,book_id,quantity,price,saleOff_code) VALUES (?,?,?,?,?)",
      [
        OrderItemData.order_id,
        OrderItemData.book_id,
        OrderItemData.quantity,
        OrderItemData.price,
        OrderItemData.saleOff_code,
      ]
    );
    return result.insertId; // Trả về ID của entryBook mới được chèn
  } catch (error) {
    throw error;
  }
};

const updateOrderItem = async (orderItemId, data) => {
  try {
    const query =
      "UPDATE order_items SET order_id=?,book_id=?,quantity=?,price=?,saleOff_code=? WHERE order_item_id=?";
    const values = [
      data.order_id,
      data.book_id,
      data.quantity,
      data.price,
      data.saleOff_code,
      orderItemId,
    ];

    // Thực hiện truy vấn cập nhật
    const result = await db.query(query, values);

    // Kiểm tra xem cập nhật có thành công hay không
    if (result.affectedRows === 0) {
      throw new Error("OrderItem not found or no changes made");
    }

    return true; // Trả về true nếu cập nhật thành công
  } catch (error) {
    console.error(error);
    throw error; // Ném lỗi để controller có thể xử lý
  }
};
const deleteOrderItem = async (orderitemID) => {
  try {
    // Trong trường hợp này, giả sử bạn có một bảng người dùng trong cơ sở dữ liệu
    // Thực hiện truy vấn cập nhật thông tin người dùng
    const query = "DELETE FROM order_items WHERE order_item_id=?";

    // Thực hiện truy vấn cập nhật
    const result = await db.query(query, [orderitemID]);

    // Kiểm tra xem cập nhật có thành công hay không
    if (result.affectedRows > 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    throw error; // Ném lỗi để controller có thể xử lý
  }
};
const deleteAllOrderItem = async (orderID) => {
  try {
    // Trong trường hợp này, giả sử bạn có một bảng người dùng trong cơ sở dữ liệu
    // Thực hiện truy vấn cập nhật thông tin người dùng
    const query = "DELETE FROM order_items WHERE order_id=?";

    // Thực hiện truy vấn cập nhật
    const result = await db.query(query, [orderID]);

    // Kiểm tra xem cập nhật có thành công hay không
    if (result.affectedRows > 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    throw error; // Ném lỗi để controller có thể xử lý
  }
};

module.exports = {
  getOrderItemById,
  getOrderItemByOrder,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
  deleteAllOrderItem,
};
