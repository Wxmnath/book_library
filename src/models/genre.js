module.exports = (connection, DataTypes) => {
  const schema = {
    genre: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: "Add Genre",
        },
        notNull: {
          args: [true],
          msg: "Add Genre",
        },
      },
    },
  };

  const GenreModel = connection.define("Genre", schema);
  return GenreModel;
};
