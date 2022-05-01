"use strict";
const Sequelize = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    static associate(models) {
     Color.belongsTo(models.Product, {
        foreignKey: "productId",
        sourceKey: "productId",
        onDelete: "CASCADE",
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

      productId: {
        allowNull: false,
        type: Sequelize.INTEGER, 
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Color",
    }
  );
  return Color;
};
