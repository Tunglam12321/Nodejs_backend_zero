// controllers/userController.js

const userModel = require("../models/UserModel");
const { RefreshTokenService } = require("../services/checkAcount");

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await userModel.getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const createUser = async (req, res) => {
  const userData = req.body;
  // Kiểm tra tồn tại và định dạng của dữ liệu đầu vào
  if (
    !userData ||
    !userData.email ||
    !userData.passwordd ||
    !userData.confirmpassword
  ) {
    return res
      .status(400)
      .json({ message: "Invalid input data", status: "ERR" });
  }
  //Kiểm tra gõ lại mật khẩu
  if (userData.passwordd != userData.confirmpassword) {
    return res
      .status(400)
      .json({ message: "Invalid input data", status: "ERR" });
  }
  // Kiểm tra định dạng email sử dụng regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userData.email)) {
    return res
      .status(400)
      .json({ message: "Invalid email format", status: "ERR" });
  }

  // Kiểm tra chiều dài mật khẩu
  if (userData.passwordd.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters long",
      status: "ERR",
    });
  }
  try {
    const existingUser = await userModel.getUserByEmail(userData.email);

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Email is already in use", status: "ERR" });
    }
    const newUserId = await userModel.createUser(userData);
    res.json({ id: newUserId, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", status: "ERR" });
  }
};
const updateUser = async (req, res) => {
  const userId = req.user.sub.id; // Lấy ID người dùng từ thông tin xác thực (ví dụ: JWT token)

  const { name, city, passwordd } = req.body; // Lấy thông tin cập nhật từ phần thân yêu cầu
  try {
    // Thực hiện cập nhật thông tin người dùng trong cơ sở dữ liệu
    await userModel.updateUser(userId, { name, city, passwordd });

    res.json({ message: "User information updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteUser = async (req, res) => {
  const userId = req.params.id; // Lấy ID người dùng từ thông tin xác thực (ví dụ: JWT token)

  try {
    // Thực hiện cập nhật thông tin người dùng trong cơ sở dữ liệu
    await userModel.deleteUser(userId);

    res.json({ message: "Delete user successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.headers.token.split(" ")[1];
    // Thực hiện cập nhật thông tin người dùng trong cơ sở dữ liệu
    if (!token) {
      return res.status(200).json({
        status: "ERR",
        message: "The token is required",
      });
    }
    const response = await RefreshTokenService(token);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  refreshToken,
};
