const express = require("express");
const controllerReader = require("./controllers/reader");
const controllerBook = require("../src/controllers/book");

const app = express();

app.use(express.json());

app.post("/readers", controllerReader.create);
app.get("/readers", controllerReader.read);
app.get("/readers/:id", controllerReader.readId);
app.patch("/readers/:id", controllerReader.update);
app.delete("/readers/:id", controllerReader.delete);

app.post("/books", controllerBook.create);
app.get("/books", controllerBook.allBooks);
app.get("/books/:id", controllerBook.bookId);
app.patch("/books/:id", controllerBook.update);
app.delete("/books/:id", controllerBook.delete);

module.exports = app;
