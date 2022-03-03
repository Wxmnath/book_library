const { Reader } = require("../models");

exports.create = async (req, res) => {
  try {
    const newReader = await Reader.create(req.body);
    res.status(201).json(newReader);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

exports.read = async (req, res) => {
  try {
    const readers = await Reader.findAll();
    res.status(200).json(readers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

exports.readId = async (req, res) => {
  try {
    const { readerId } = req.params;
    const foundReader = await Reader.findByPk(readerId);
    if (foundReader === null) {
      res.status(404).json({ error: "The reader could not be found." });
    } else {
      res.status(200).json(foundReader);
    }
  } catch (err) {
    res.sendStatus(500);
  }
};
