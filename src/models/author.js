module.exports = (connection, DataTypes) => {
  const schema = {
    author: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: "Add author",
        },
        notNull: {
          args: [true],
          msg: "Add author",
        },
      },
    },
  };

  const AuthorModel = connection.define("Author", schema);
  return AuthorModel;
};
