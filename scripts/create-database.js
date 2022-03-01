const mysql = require("mysql2/promise");
const path = require("path");
const args = process.argv.slice(2)[0];
const envFile = args === "test" ? "../.env.test" : "../.env";
require("dotenv").config({
  path: path.join(__dirname, envFile),
});
const { DB_PASSWORD, DB_NAME, DB_USER, DB_HOST, DB_PORT } = process.env;
const setUpDatabase = async () => {
  try {
    const db = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      port: DB_PORT,
    });

    // As you can see, db.query() takes a SQL statement as a string, which is then sent to the database.
    // Here we are selecting the database that has just been created, then creating an Artist table with id, name and genre columns.
    await db.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
    await db.query(`USE ${DB_NAME}`);
    await db.query(`CREATE TABLE IF NOT EXISTS Artist (
      id INT PRIMARY KEY auto_increment,
      name VARCHAR(25),
      genre VARCHAR(25)
    )`);

    db.close();
  } catch (err) {
    console.log(
      `Your environment variables might be wrong. Please double check .env file`
    );
    console.log("Environment Variables are:", {
      DB_PASSWORD,
      DB_USER,
      DB_HOST,
      DB_PORT,
    });
    console.log(err);
  }
};

setUpDatabase();