const jwt = require("jsonwebtoken");

// Middleware để kiểm tra quyền admin
const checkUser = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Token not provided" });
  }
  try {
    // Giải mã token
    const decoded = jwt.verify(token, "access_token");
    // Kiểm tra quyền admin
    if (decoded.sub.isUser) {
      req.user = decoded; // Lưu thông tin người dùng vào req.user để sử dụng ở các middleware sau
      next(); // Cho phép tiếp tục xử lý yêu cầu
    } else {
      return res
        .status(403)
        .json({ error: "Forbidden - User is not an admin" });
    }
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};

module.exports = checkUser;
