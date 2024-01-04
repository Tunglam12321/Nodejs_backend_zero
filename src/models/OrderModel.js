// OrderModel.js

const db = require("../config/database");
const getAllOrder = async () => {
  try {
    const [rows, fields] = await db.execute("SELECT * FROM orders");
    return rows;
  } catch (error) {
    throw error;
  }
};

const getOrderById = async (order_id) => {
  try {
    const [rows, fields] = await db.execute(
      "SELECT * FROM orders WHERE order_id = ?",
      [entry_id]
    );
    return rows[0];
  } catch (error) {
    throw error;
  }
};
const getOrderByUser = async (user_id) => {
  try {
    const [rows, fields] = await db.execute(
      "SELECT * FROM orders WHERE user_id = ?",
      [user_id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};
const createOrder = async (OrderData) => {
  try {
    const [result] = await db.execute(
      "INSERT INTO orders (order_date,total_amount,status,user_id) VALUES (?,?,?,?)",
      [
        OrderData.order_date,
        OrderData.total_amount,
        OrderData.status,
        OrderData.user_id,
      ]
    );
    return result.insertId; // Trả về ID của entryBook mới được chèn
  } catch (error) {
    throw error;
  }
};

const updateOrder = async (orderId, data) => {
  try {
    const query =
      "UPDATE orders SET order_date=?,total_amount=?,status=?,user_id=? WHERE order_id=?";
    const values = [
      data.order_date,
      data.total_amount,
      data.status,
      data.user_id,
      orderId,
    ];

    // Thực hiện truy vấn cập nhật
    const result = await db.query(query, values);

    // Kiểm tra xem cập nhật có thành công hay không
    if (result.affectedRows === 0) {
      throw new Error("User not found or no changes made");
    }

    return true; // Trả về true nếu cập nhật thành công
  } catch (error) {
    console.error(error);
    throw error; // Ném lỗi để controller có thể xử lý
  }
};
const deleteOrder = async (orderID) => {
  try {
    // Trong trường hợp này, giả sử bạn có một bảng người dùng trong cơ sở dữ liệu
    // Thực hiện truy vấn cập nhật thông tin người dùng
    const query = "DELETE FROM orders WHERE order_id=?";

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
  getAllOrder,
  deleteOrder,
  updateOrder,
  createOrder,
  getOrderById,
  getOrderByUser,
};
