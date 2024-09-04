"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.MyMovieList, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notNull: {
            args: true,
            message: "Title is required",
          },
          notEmpty: {
            args: true,
            message: "Title is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,

        unique: true,
        validate: {
          notNull: {
            args: true,
            message: "Title is required",
          },
          notEmpty: {
            args: true,
            message: "Title is required",
          },
          isEmail: {
            message: "Email must be in email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notNull: {
            args: true,
            message: "Title is required",
          },
          notEmpty: {
            args: true,
            message: "Title is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
