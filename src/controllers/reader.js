const { Reader } = require("../models");

exports.create = async (req, res) => {
  const newReader = await Reader.create(req.body);
  res.status(201).json(newReader);
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
  const readerId = req.params.id;
  const reader = await Reader.findByPK(readerId);

  if (!reader) {
    res.sendStatus(404);
  } else {
    res.status(200).json(reader);
  }
};
