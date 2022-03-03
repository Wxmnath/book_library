const express = require("express");
const createReader = require("./controllers/reader");

const app = express();

app.use(express.json());

app.post("/readers", createReader.create);

module.exports = app;
