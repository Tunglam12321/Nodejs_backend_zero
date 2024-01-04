// controllers/userController.js

const bookModel = require("../models/BookModels");

const getAllBooks = async (req, res) => {
  try {
    const limit = req.query.limit || 10; // Số lượng mục trên mỗi trang
    const page = req.query.page || 1; // Số trang
    // Offset được tính từ trang và limit

    const books = await bookModel.getAllBooks(limit, page);
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBookById = async (req, res) => {
  const bookIds = req.params.id;
  try {
    const book = await bookModel.getBookById(bookIds);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const createBook = async (req, res) => {
  const bookData = req.body;
  // Kiểm tra tồn tại và định dạng của dữ liệu đầu vào
  if (
    !bookData ||
    !bookData.title ||
    !bookData.price ||
    !bookData.author ||
    !bookData.categories ||
    !bookData.published_date
  ) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  try {
    const newBookId = await bookModel.createBooks(bookData);
    res.json({ id: newBookId, message: "Book created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateBook = async (req, res) => {
  const bookId = req.params.id; // Lấy ID người dùng từ thông tin xác thực (ví dụ: JWT token)

  const { title, author, description, price, categories, image } = req.body; // Lấy thông tin cập nhật từ phần thân yêu cầu
  try {
    // Thực hiện cập nhật thông tin người dùng trong cơ sở dữ liệu
    await bookModel.updateBook(bookId, {
      title,
      author,
      description,
      price,
      categories,
      image,
    });

    res.json({ message: "Book information updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteBook = async (req, res) => {
  const bookId = req.params.id; // Lấy ID người dùng từ thông tin xác thực (ví dụ: JWT token)

  try {
    // Thực hiện cập nhật thông tin người dùng trong cơ sở dữ liệu
    await bookModel.deleteBook(bookId);

    res.json({ message: "Delete book successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
