const express = require("express");

const router = express.Router();
const authorController = require("../controllers/author");

router
  .route("/")
  .post(authorController.createAuthor)
  .get(authorController.getAuthor);

router
  .route("/:id")
  .get(authorController.getAuthorById)
  .patch(authorController.updateAuthor)
  .delete(authorController.deleteAuthor);

module.exports = router;
