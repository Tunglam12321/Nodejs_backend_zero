// controllers/userController.js

const EntryModel = require("../models/EntryBookModel");

const getAllEntryBooks = async (req, res) => {
  try {
    const entries = await EntryModel.getAllEntryBook();
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getEntryBookById = async (req, res) => {
  const entryIds = req.params.id;
  try {
    const entry = await EntryModel.getEntryBookById(entryIds);

    if (!entry) {
      return res.status(404).json({ error: "EntryBook not found" });
    }

    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const createEntryBook = async (req, res) => {
  const entryData = req.body;
  // Kiểm tra tồn tại và định dạng của dữ liệu đầu vào
  if (
    !entryData ||
    !entryData.entry_date ||
    !entryData.price ||
    !entryData.quantity_added ||
    !entryData.book_id
  ) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  try {
    const newEntryId = await EntryModel.createEntryBook(entryData);
    res.json({ id: newEntryId, message: "EntryBook created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateEntryBook = async (req, res) => {
  const EntryId = req.params.id; // Lấy ID người dùng từ thông tin xác thực (ví dụ: JWT token)
  const data = req.body; // Lấy thông tin cập nhật từ phần thân yêu cầu
  try {
    // Thực hiện cập nhật thông tin người dùng trong cơ sở dữ liệu
    await EntryModel.updateEntryBook(EntryId, data);

    res.json({ message: "Entry Book information updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteEntryBook = async (req, res) => {
  const entryId = req.params.id; // Lấy ID người dùng từ thông tin xác thực (ví dụ: JWT token)

  try {
    // Thực hiện cập nhật thông tin người dùng trong cơ sở dữ liệu
    await EntryModel.deleteEntryBook(entryId);

    res.json({ message: "Delete entrybook successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllEntryBooks,
  deleteEntryBook,
  updateEntryBook,
  createEntryBook,
  getEntryBookById,
};
