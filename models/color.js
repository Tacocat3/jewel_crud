"use strict";
const Sequelize = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    static associate(models) {
      Color.belongsToMany(models.Product, {
        through: "color_products",
        foreignKey: "colorId",
        onDelete: "CASCADE",
        timestamps: false,
      });
    }
  }
  Color.init(
    {
      colorId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

     name: {
        allowNull: false,
        type: Sequelize.STRING(20),
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Color",
    }
  );
  return Color;
};
