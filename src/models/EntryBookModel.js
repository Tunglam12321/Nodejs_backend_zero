// bookModel.js

const db = require("../config/database");
const getAllEntryBook = async () => {
  try {
    const [rows, fields] = await db.execute("SELECT * FROM stock_entries");
    return rows;
  } catch (error) {
    throw error;
  }
};

const getEntryBookById = async (entry_id) => {
  try {
    const [rows, fields] = await db.execute(
      "SELECT * FROM stock_entries WHERE entry_id = ?",
      [entry_id]
    );
    return rows[0];
  } catch (error) {
    throw error;
  }
};
const getBookByConditions = async (conditions) => {
  try {
    const query = "SELECT * FROM books WHERE";
    const arr = [];
    if (!conditions.title) {
      query += " title LIKE ?";
      arr.push(conditions.title);
    }
    if (!conditions.author) {
      query += " author=?";
      arr.push(conditions.author);
    }
    if (!conditions.category) {
      query += " categories =?";
      arr.push(conditions.category);
    }
    if (!conditions.price1 & !conditions.price2) {
      query += " price BETWEEN ? AND ?";
      arr.push(conditions.price1, conditions.price2);
    }
    if (!conditions.price1 & (conditions.price2 == 0)) {
      query += " price <= ?";
      arr.push(conditions.price1);
    }
    if (!conditions.price2 & (conditions.price1 == 0)) {
      query += " price >= ?";
      arr.push(conditions.price2);
    }
    if (!conditions.arrangByASC & (conditions.arrangByDESC == 0)) {
      query += " ORDER BY price ASC";
    }
    if (!conditions.arrangByDESC & (conditions.arrangByASC == 0)) {
      query += " ORDER BY price DESC";
    }
    const [rows, fields] = await db.execute(query, arr);
    return rows;
  } catch (error) {
    throw error;
  }
};

const createEntryBook = async (entryBookData) => {
  try {
    const [result] = await db.execute(
      "INSERT INTO stock_entries (book_id,quantity_added,entry_date,price) VALUES (?,?,?,?)",
      [
        entryBookData.book_id,
        entryBookData.quantity_added,
        entryBookData.entry_date,
        entryBookData.price,
      ]
    );
    return result.insertId; // Trả về ID của entryBook mới được chèn
  } catch (error) {
    throw error;
  }
};

const updateEntryBook = async (entryId, data) => {
  try {
    const query =
      "UPDATE stock_entries SET book_id=?,quantity_added=?,entry_date=?,price=? WHERE entry_id=?";
    const values = [
      data.book_id,
      data.quantity_added,
      data.entry_date,
      data.price,
      entryId,
    ];

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
const deleteEntryBook = async (entryID) => {
  try {
    // Trong trường hợp này, giả sử bạn có một bảng người dùng trong cơ sở dữ liệu
    // Thực hiện truy vấn cập nhật thông tin người dùng
    const query = "DELETE FROM stock_entries WHERE entry_id=?";

    // Thực hiện truy vấn cập nhật
    const result = await db.query(query, [entryID]);

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
  getAllEntryBook,
  deleteEntryBook,
  updateEntryBook,
  createEntryBook,
  getEntryBookById,
};
