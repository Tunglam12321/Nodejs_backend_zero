const jwt = require("jsonwebtoken");

// Function để tạo token
const generateToken = async (user) => {
  // Thời gian hết hạn của token (ví dụ: 1 giờ)
  const expiresIn = "1m";

  // Tạo token và ký bằng secret key
  const token = jwt.sign({ sub: user }, "access_token", { expiresIn });

  return token;
};

const generateRefreshToken = async (user) => {
  // Thời gian hết hạn của token (ví dụ: 1 giờ)
  const expiresIn = "365d";

  // Tạo token và ký bằng secret key
  const token = jwt.sign({ sub: user }, "refresh_token", { expiresIn });

  return token;
};
const RefreshTokenService = async (token) => {
  try {
    const decoded = jwt.verify(token, "refresh_token");
    if (decoded.sub.isUser) {
      const access_token = await generateToken(decoded.sub);
      return { status: "OK", access_token: access_token };
    }
    return res.status(404).json({ message: "Error" });
  } catch (error) {
    return {
      message: error,
    };
  }
};
module.exports = {
  generateToken,
  generateRefreshToken,
  RefreshTokenService,
};
