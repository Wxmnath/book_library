const {
  createItem,
  deleteItem,
  getAllById,
  getAllItems,
  updateItem,
} = require("./helper");

const createReader = (req, res) => createItem(res, "reader", req.body);

const getReaders = (_, res) => getAllItems(res, "reader");

const getReaderById = (req, res) => getAllById(res, "reader", req.params.id);

const updateReader = (req, res) =>
  updateItem(res, "reader", req.body, req.params.id);

const deleteReader = (req, res) => deleteItem(res, "reader", req.params.id);

module.exports = {
  createReader,
  getReaderById,
  getReaders,
  updateReader,
  deleteReader,
};

// exports.read = async (_, res) => {
//   try {
//     const readers = await Reader.findAll();
//     res.status(200).json(readers);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error });
//   }
// };

// exports.readId = async (req, res) => {
//   try {
//     const readerId = req.params.id;
//     const getReader = await Reader.findByPk(readerId);

//     if (getReader === null) {
//       res.status(404).json({ error: "The reader could not be found." });
//     } else {
//       res.status(200).json(getReader);
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error });
//   }
// };

// exports.update = async (req, res) => {
//   try {
//     const readerId = req.params.id;
//     const newData = req.body;
//     const getReader = await Reader.findByPk(readerId);
//     const readerUpdate = await Reader.update(newData, { where: {} });

//     if (!getReader) {
//       res.status(404).json({ error: "The reader could not be found." });
//     } else {
//       res.status(200).json(readerUpdate);
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ error });
//   }
// };

// exports.delete = async (req, res) => {
//   try {
//     const readerId = req.params.id;
//     const foundReader = await Reader.findByPk(readerId);
//     const deletedReader = await Reader.destroy({ where: { id: readerId } });

//     if (!foundReader) {
//       res.status(404).json({ error: "The reader could not be found." });
//     } else {
//       res.status(204).json(deletedReader);
//     }
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(400).json({ error });
//   }
// };
