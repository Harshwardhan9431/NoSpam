module.exports = (sequelize, DataTypes) => {
  const Directory = sequelize.define(
    "Directory",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      phone: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      likely_spam: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      tableName: 'Directory',
      timestamps: false,
    }
  );
  return Directory;
};
