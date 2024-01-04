require("dotenv").config();
const express = require("express");
const configViewEngine = require("./config/viewEngine");
const apiRoutes = require("./routes/api");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
//config template engine
configViewEngine(app);
app.use(express.json());
// Endpoint cần kiểm tra quyền admin

app.use("/api", apiRoutes);
// Lắng nghe trên cổng đã đặt
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
