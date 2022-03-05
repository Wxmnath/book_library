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
        notNull: {
          msg: "Please enter your email",
        },
      },
      isEmail: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, //notNull: true
      validate: {
        notNull: {
          msg: "Pleas enter your password",
        },
      },
      len: [8, 99],
    },
  };

  const ReaderModel = connection.define("Reader", schema);
  return ReaderModel;
};
