const express = require("express");
const controllerReader = require("./controllers/reader");

const app = express();

app.use(express.json());

app.post("/readers", controllerReader.create);
app.get("/readers", controllerReader.read);
app.get("/readers/:id", controllerReader.readId);

module.exports = app;
