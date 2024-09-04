"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MyMovieList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MyMovieList.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  MyMovieList.init(
    {
      userId: DataTypes.INTEGER,
      movieId: DataTypes.INTEGER,
      listName: DataTypes.STRING,
      tags: DataTypes.ARRAY(DataTypes.STRING),
    },
    {
      sequelize,
      modelName: "MyMovieList",
    }
  );
  return MyMovieList;
};
