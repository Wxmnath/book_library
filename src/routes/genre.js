const express = require("express");

const router = express.Router();
const genreController = require("../controllers/genre");

router
  .route("/")
  .post(genreController.createGenre)
  .get(genreController.getGenre);

router
  .route("/:id")
  .get(genreController.getGenreById)
  .patch(genreController.updateGenre)
  .delete(genreController.deleteGenre);

module.exports = router;
