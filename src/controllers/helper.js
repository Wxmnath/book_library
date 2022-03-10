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

const removePassword = (obj) => {
  if (obj.hasOwnProperty("password")) {
    delete obj.password;
  }
  return obj;
};

const createItem = async (res, model, item) => {
  const Model = getModel(model);

  try {
    const newItem = await Model.create(item);
    const itemWithoutPassword = removePassword(newItem.dataValues);
    res.status(201).json(itemWithoutPassword);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getAllItems = async (res, model) => {
  const Model = getModel(model);

  try {
    const allItems = await Model.findAll();
    const itemWithoutPassword = allItems.map((item) =>
      removePassword(item.dataValues)
    );

    res.status(200).json(itemWithoutPassword);
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
      const itemWithoutPassword = removePassword(item.dataValues);
      res.status(200).json(itemWithoutPassword);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateItem = async (res, model, item, id) => {
  const Model = getModel(model);
  try {
    const [itemsUpdated] = await Model.update(item, { where: { id } });

    if (!itemsUpdated) {
      res.status(404).json(showsA404Error(model));
    } else {
      const updatedItem = await Model.findByPk(id);
      const itemWithoutPassword = removePassword(updatedItem.get());
      res.status(200).json(itemWithoutPassword);
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
