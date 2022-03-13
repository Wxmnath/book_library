const {
  createItem,
  getAllItems,
  getAllById,
  updateItem,
  deleteItem,
} = require("./helper");

const createAuthor = (req, res) => createItem(res, "author", req.body);

const getAuthor = (_, res) => getAllItems(res, "author");

const getAuthorById = (req, res) => getAllById(res, "author", req.params.id);

const updateAuthor = (req, res) =>
  updateItem(res, "author", req.body, req.params.id);

const deleteAuthor = (req, res) => deleteItem(res, "author", req.params.id);

module.exports = {
  createAuthor,
  getAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};
