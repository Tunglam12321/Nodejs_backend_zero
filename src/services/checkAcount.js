const jwt = require("jsonwebtoken");

// Function để tạo token
const generateToken = async (user) => {
  // Thời gian hết hạn của token (ví dụ: 1 giờ)
  const expiresIn = "30s";

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
    jwt.verify(token, "refresh_token", async (err, user) => {
      if (err) {
        return {
          status: "ERR",
          message: "The authetication",
        };
      }
      const { payload } = user;
      const access_token = await generateToken(payload);
      return {
        status: "OK",
        message: "SUCCESS",
        access_token: access_token,
      };
    });
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
