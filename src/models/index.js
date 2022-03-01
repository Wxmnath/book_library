const { Sequelize } = require("sequelize");

const { DB_PASSWORD, DB_NAME, DB_USER, DB_HOST, DB_PORT } = process.env;

const setUpDatabase = () => {
  const connection = new Sequelize(DB_PASSWORD, DB_NAME, DB_USER, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: "mysql",
    logging: false,
  });
  connection.sync({ alter: true });
  return {};
};

module.exports = setUpDatabase();
