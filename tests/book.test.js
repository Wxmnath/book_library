const { expect } = require("chai");
const request = require("supertest");
const { Book } = require("../src/models");
const app = require("../src/app");

describe("/books", () => {
  before(async () => Book.sequelize.sync());

  beforeEach(async () => {
    await Book.destroy({ where: {} });
  });

  describe("with no records in the database", () => {
    describe("POST /books", () => {
      it("creates a new book in the database", async () => {
        const response = await request(app).post("/books").send({
          title: "Harry Potter and the Philosopher's Stone",
          author: "J.K Rowling",
          genre: "Fiction",
          ISBN: "00013214568",
        });
        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.title).to.equal(
          "Harry Potter and the Philosopher's Stone"
        );
        expect(newBookRecord.title).to.equal(
          "Harry Potter and the Philosopher's Stone"
        );
        expect(newBookRecord.author).to.equal("J.K Rowling");
        expect(newBookRecord.genre).to.equal("Fiction");
        expect(newBookRecord.ISBN).to.equal("00013214568");
      });

      it("errors if title is left blank", async () => {
        const response = await request(app).post("/books").send({
          title: null,
          author: "J.K Rowling",
          genre: "Fiction",
          ISBN: "00013214568",
        });

        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(400);
        expect(newBookRecord).to.equal(null);
      });

      it("errors if author is left blank", async () => {
        const response = await request(app).post("/books").send({
          title: "Harry Potter and the Philosopher's Stone",
          author: null,
          genre: "Fiction",
          ISBN: "00013214568",
        });

        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(400);
        expect(newBookRecord).to.equal(null);
      });
      it("errors if author is left blank", async () => {
        const response = await request(app).post("/books").send({
          title: "Harry Potter and the Philosopher's Stone",
          author: "J.K Rowling",
          genre: null,
          ISBN: "00013214568",
        });

        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(400);
        expect(newBookRecord).to.equal(null);
      });
      it("errors if author is left blank", async () => {
        const response = await request(app).post("/books").send({
          title: "Harry Potter and the Philosopher's Stone",
          author: "J.K Rowling",
          genre: "Fiction",
          ISBN: null,
        });

        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(400);
        expect(newBookRecord).to.equal(null);
      });
      it("errors if ISBN does not have 11 characters entered", async () => {
        const response = await request(app).post("/readers").send({
          title: "Harry Potter and the Philosopher's Stone",
          author: "J.K Rowling",
          genre: "Fiction",
          ISBN: "000132145683",
        });

        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(400);
        expect(response.status.ISBN).to.equal();
        expect(newBookRecord).to.equal(null);
      });
    });
  });

  describe("with records in the database", () => {
    let books;

    beforeEach(async () => {
      books = await Promise.all([
        Book.create({
          title: "Harry Potter and the Philosopher's Stone",
          author: "J.K Rowling",
          genre: "Fiction",
          ISBN: "00013214568",
        }),

        Book.create({
          title: "Belonging",
          author: "Alun Wyn Jones",
          genre: "Biography",
          ISBN: "00085642568",
        }),
        Book.create({
          title: "Charlie and the Chocolate Factory",
          author: "Roald Dahl",
          genre: "Fiction",
          ISBN: "00058974568",
        }),
      ]);
    });

    describe("GET /books", () => {
      it("gets all books records", async () => {
        const response = await request(app).get("/books");

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((book) => {
          const expected = books.find((a) => a.id === book.id);

          expect(book.title).to.equal(expected.title);
          expect(book.author).to.equal(expected.author);
          expect(book.genre).to.equal(expected.genre);
          expect(book.ISBN).to.equal(expected.ISBN);
        });
      });
    });

    describe("GET /books/:id", () => {
      it("gets books record by id", async () => {
        const book = books[0];
        const response = await request(app).get(`/books/${book.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.title).to.equal(book.title);
        expect(response.body.author).to.equal(book.author);
        expect(response.body.genre).to.equal(book.genre);
        expect(response.body.ISBN).to.equal(book.ISBN);
      });

      it("returns a 404 if the book does not exist", async () => {
        const response = await request(app).get("/books/12345");

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The book could not be found.");
      });
    });

    describe("PATCH /books/:id", () => {
      it("updates books genre by id", async () => {
        const book = books[0];
        const response = await request(app)
          .patch(`/books/${book.id}`)
          .send({ genre: "Fantasy" });
        const updatedBookRecord = await Book.findByPk(book.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedBookRecord.genre).to.equal("Fantasy");
      });

      it("returns a 404 if the book does not exist", async () => {
        const response = await request(app)
          .patch("/books/12345")
          .send({ genre: "Fantasy" });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The book could not be found.");
      });
    });

    describe("DELETE /books/:id", () => {
      it("deletes book record by id", async () => {
        const book = books[0];
        const response = await request(app).delete(`/books/${book.id}`);
        const deletedBook = await Book.findByPk(book.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedBook).to.equal(null);
      });

      it("returns a 404 if the book does not exist", async () => {
        const response = await request(app).delete("/books/12345");
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The book could not be found.");
      });
    });
  });
});
