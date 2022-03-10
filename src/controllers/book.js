const {
  createItem,
  getAllItems,
  getAllById,
  updateItem,
  deleteItem,
} = require("./helper");

const createBook = (req, res) => createItem(res, "book", req.body);

const getBooks = (_, res) => getAllItems(res, "book");

const getBookById = (req, res) => getAllById(res, "book", req.params.id);

const updateBook = (req, res) =>
  updateItem(res, "book", req.body, req.params.id);

const deleteBook = (req, res) => deleteItem(res, "book", req.params.id);

module.exports = { createBook, getBooks, getBookById, updateBook, deleteBook };
