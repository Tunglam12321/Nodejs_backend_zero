// userModel.js

const db = require("../config/database");
const bcrypt = require("bcrypt");
const getAllUsers = async () => {
  try {
    const [rows, fields] = await db.execute("SELECT * FROM Users");
    return rows;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (userId) => {
  try {
    const [rows, fields] = await db.execute(
      "SELECT * FROM Users WHERE id = ?",
      [userId]
    );
    return rows[0];
  } catch (error) {
    throw error;
  }
};
const getUserByEmail = async (userEmail) => {
  try {
    const [rows, fields] = await db.execute(
      "SELECT * FROM Users WHERE email = ?",
      [userEmail]
    );
    return rows[0];
  } catch (error) {
    throw error;
  }
};
const createUser = async (userData) => {
  try {
    const hashpassword = await bcrypt.hash(userData.passwordd, 10);
    const [result] = await db.execute(
      "INSERT INTO Users (email,passwordd) VALUES (?, ?)",
      [userData.email, hashpassword]
    );
    return result.insertId; // Trả về ID của user mới được chèn
  } catch (error) {
    throw error;
  }
};
const updateUser = async (userId, updatedInfo) => {
  try {
    // Trong trường hợp này, giả sử bạn có một bảng người dùng trong cơ sở dữ liệu
    // Thực hiện truy vấn cập nhật thông tin người dùng
    const hashpassword = await bcrypt.hash(updatedInfo.passwordd, 10);
    const query = "UPDATE Users SET name=?, city=?, passwordd=? WHERE id=?";
    const values = [updatedInfo.name, updatedInfo.city, hashpassword, userId];

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
const deleteUser = async (userID) => {
  try {
    // Trong trường hợp này, giả sử bạn có một bảng người dùng trong cơ sở dữ liệu
    // Thực hiện truy vấn cập nhật thông tin người dùng
    const query = "DELETE FROM Users WHERE id=?";

    // Thực hiện truy vấn cập nhật
    const result = await db.query(query, [userID]);

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
  getAllUsers,
  getUserById,
  createUser,
  getUserByEmail,
  updateUser,
  deleteUser,
};
