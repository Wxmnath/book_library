const { Book, Reader } = require("../models");

const showsA404Error = (model) => ({
  error: `The ${model} could not be found.`,
});

const getModel = (model) => {
  const models = {
    book: Book,
    reader: Reader,
  };
  return models[model];
};

const createItem = async (res, model, item) => {
  const Model = getModel(model);

  try {
    const newItem = await Model.create(item);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getAllItems = async (res, model) => {
  const Model = getModel(model);

  try {
    const allItems = await Model.findAll();

    res.status(200).json(allItems);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getAllById = async (res, model, id) => {
  const Model = getModel(model);
  try {
    const item = await Model.findByPk(id);

    if (item === null) {
      res.status(404).json(showsA404Error(model));
    } else {
      res.status(200).json(item);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateItem = async (res, model, item, id) => {
  const Model = getModel(model);
  try {
    const updatedItem = await Model.findByPk(id);
    const itemsUpdated = await Model.update(item, { where: { id } });

    if (!updatedItem) {
      res.status(404).json(showsA404Error(model));
    } else {
      res.status(200).json(itemsUpdated);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

const deleteItem = async (res, model, id) => {
  const Model = getModel(model);
  try {
    const foundItem = await Model.findByPk(id);
    const itemsDeleted = await Model.destroy({ where: { id } });

    if (!foundItem) {
      res.status(404).json(showsA404Error(model));
    } else {
      res.status(204).json(itemsDeleted);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  createItem,
  getAllItems,
  getAllById,
  updateItem,
  deleteItem,
};
