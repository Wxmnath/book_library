const {
  createItem,
  getAllItems,
  getAllById,
  updateItem,
  deleteItem,
} = require("./helper");

const createGenre = (req, res) => createItem(res, "genre", req.body);

const getGenre = (_, res) => getAllItems(res, "genre");

const getGenreById = (req, res) => getAllById(res, "genre", req.params.id);

const updateGenre = (req, res) =>
  updateItem(res, "genre", req.body, req.params.id);

const deleteGenre = (req, res) => deleteItem(res, "genre", req.params.id);

module.exports = {
  createGenre,
  getGenreById,
  getGenre,
  updateGenre,
  deleteGenre,
};
