// routes/api.js

const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/UserController");
const authControllers = require("../controllers/authController");
const bookControllers = require("../controllers/bookController");
const entryControllers = require("../controllers/entryController");
const orderControllers = require("../controllers/orderController");
const orderItemControllers = require("../controllers/orderItemController");
const checkAdmin = require("../middleware/checkAdmin");
const checkUser = require("../middleware/checkUser");
// Define API routes
router.get("/users", userControllers.getAllUsers);
router.get("/users/:id", checkUser, userControllers.getUserById);
router.post("/create-users", userControllers.createUser);
router.post("/login", authControllers.loginUser);
// router.post("/users/update", userControllers.updateUser);
router.patch("/users/update", checkAdmin, userControllers.updateUser);
// // Endpoint cần kiểm tra quyền admin
router.delete("/delete-users/:id", checkAdmin, userControllers.deleteUser);
router.post("/refesh-token", userControllers.refreshToken);

//API book
router.get("/get-allbooks", bookControllers.getAllBooks);
router.post("/create-book", bookControllers.createBook);
router.put("/update-book/:id", bookControllers.updateBook);
router.get("/get-detail/:id", bookControllers.getBookById);
router.delete("/delete-book/:id", bookControllers.deleteBook);

//API entrybook
router.get("/get-allentry", entryControllers.getAllEntryBooks);
router.post("/create-entry", entryControllers.createEntryBook);
router.put("/update-entry/:id", entryControllers.updateEntryBook);
router.get("/get-entry/:id", entryControllers.getEntryBookById);
router.delete("/delete-entry/:id", entryControllers.deleteEntryBook);

//API order
router.get("/get-order-byadmin", checkAdmin, orderControllers.getAllOrder);
router.get(
  "/get-order-id-byadmin/:id",
  checkAdmin,
  orderControllers.getOrderById
);
router.get(
  "/get-order-user-byadmin/:id",
  checkAdmin,
  orderControllers.getOrderByUser
);
router.get(
  "/get-order-user-byuser/:id",
  checkUser,
  orderControllers.getOrderUser
);
router.post("/create-order", orderControllers.createOrder);
router.put("/update-order/:id", orderControllers.updateOrder);
router.delete("/delete-order/:id", orderControllers.deleteOrder);
module.exports = router;

//API orderitem

router.get(
  "/get-orderitem-byadmin/:id",
  checkAdmin,
  orderItemControllers.getOrderByOrder
);
router.get(
  "/get-orderitem-byuser",
  checkUser,
  orderItemControllers.getOrderItemByUser
);
router.post("/create-orderitem", orderItemControllers.createOrderItem);
router.put("/update-orderitem/:id", orderItemControllers.updateOrderItem);
router.delete(
  "/delete-all-order/:id",
  checkAdmin,
  orderItemControllers.deleteAllOrderItem
);
router.delete(
  "/delete-orderItem/:id",
  checkAdmin,
  orderItemControllers.deleteOrderItem
);

module.exports = router;
