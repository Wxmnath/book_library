module.exports = (connection, DataTypes) => {
  const schema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter name",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "Valid email required",
        },
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false, //notNull: true
      validate: {
        notNull: {
          msg: "Please enter your password",
        },
      },
      len: [8, 99],
    },
  };

  const ReaderModel = connection.define("Reader", schema);
  return ReaderModel;
};
