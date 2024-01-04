// controllers/authController.js

const bcrypt = require("bcrypt");
const userModel = require("../models/UserModel");
const chechAcount = require("../services/checkAcount");

const loginUser = async (req, res) => {
  const { email, passwordd } = req.body;

  try {
    const user = await userModel.getUserByEmail(email);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email or password", status: "ERR" });
    }

    // So sánh mật khẩu đã nhập với mật khẩu đã được mã hóa trong cơ sở dữ liệu
    const passwordMatch = await bcrypt.compare(passwordd, user.passwordd);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Invalid email or password", status: "ERR" });
    }

    const access_token = await chechAcount.generateToken(user);
    const refresh_token = await chechAcount.generateRefreshToken(user);

    // Tiếp tục với quá trình đăng nhập khi mật khẩu đúng
    // res.cookie("refresh_token", access_token, {
    //   httpOnly: true,
    //   Secure: true,
    // });
    res.json({
      message: "Login successful",
      access_token,
      refresh_token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", status: "ERR" });
  }
};

module.exports = {
  loginUser,
};
