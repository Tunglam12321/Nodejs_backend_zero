// bookModel.js

const db = require("../config/database");
const getAllBooks = async (limit, page) => {
  const offset = (page - 1) * limit;
  try {
    const [rows, fields] = await db.execute(
      "SELECT * FROM books LIMIT ? OFFSET ?",
      [limit, offset]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const getBookById = async (bookIds) => {
  try {
    const [rows, fields] = await db.execute(
      "SELECT * FROM books WHERE book_id = ?",
      [bookIds]
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

const createBooks = async (bookData) => {
  try {
    const [result] = await db.execute(
      "INSERT INTO books (title,author,description,price,categories,image,published_date) VALUES (?,?,?,?,?,?,?)",
      [
        bookData.title,
        bookData.author,
        bookData.description,
        bookData.price,
        bookData.categories,
        bookData.image,
        bookData.published_date,
      ]
    );
    return result.insertId; // Trả về ID của user mới được chèn
  } catch (error) {
    throw error;
  }
};

const updateBook = async (bookId, bookData) => {
  try {
    // Trong trường hợp này, giả sử bạn có một bảng người dùng trong cơ sở dữ liệu
    // Thực hiện truy vấn cập nhật thông tin người dùng
    const query =
      "UPDATE books SET title=?,author=?,description=?,price=?,categories=?,image=? WHERE book_id=?";
    const values = [
      bookData.title,
      bookData.author,
      bookData.description,
      bookData.price,
      bookData.categories,
      bookData.image,
      bookId,
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
const deleteBook = async (bookID) => {
  try {
    // Trong trường hợp này, giả sử bạn có một bảng người dùng trong cơ sở dữ liệu
    // Thực hiện truy vấn cập nhật thông tin người dùng
    const query = "DELETE FROM books WHERE book_id=?";

    // Thực hiện truy vấn cập nhật
    const result = await db.query(query, [bookID]);

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
  getAllBooks,
  getBookById,
  deleteBook,
  updateBook,
  createBooks,
  getBookByConditions,
};
