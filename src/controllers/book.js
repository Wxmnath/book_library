const { Book } = require("../models");

exports.create = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

exports.allBooks = async (_, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

exports.bookId = async (req, res) => {
  try {
    const bookId = req.params.id;
    const getBook = await Book.findByPk(bookId);

    if (getBook === null) {
      res.status(404).json({ error: "The book could not be found." });
    } else {
      res.status(200).json(getBook);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

exports.update = async (req, res) => {
  const bookId = req.params.id;
  const newData = req.body;
  const getBook = await Book.findByPk(bookId);
  const bookUpdate = await Book.update(newData, { where: {} });

  try {
    if (!getBook) {
      res.status(404).json({ error: "The book could not be found." });
    } else {
      res.status(200).json(bookUpdate);
    }
  } catch (err) {
    res.status(400).json({ errors: err });
  }
};

exports.delete = async (req, res) => {
  const bookId = req.params.id;
  const foundBook = await Book.findByPk(bookId);
  const deletedBook = await Book.destroy({ where: { id: bookId } });

  if (!foundBook) {
    res.status(404).json({ error: "The book could not be found." });
  } else {
    res.status(204).json(deletedBook);
  }
};
