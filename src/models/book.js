module.exports = (connection, DataTypes) => {
  const schema = {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: "Must enter a title of the book",
        },
      },
    },

    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: "Must enter author",
        },
      },
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: "Must enter a genre",
        },
      },
    },

    ISBN: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: "Must enter ISBN number",
        },
        len: {
          args: [11, 11],
          msg: "ISBN must have 11 characters",
        },
      },
    },
  };

  const BookModel = connection.define("Book", schema);
  return BookModel;
};
