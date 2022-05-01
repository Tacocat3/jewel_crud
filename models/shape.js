"use strict";
const Sequelize = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Shape extends Model {
    static associate(models) {
     Shape.belongsTo(models.Product, {
        foreignKey: "productId",
        sourceKey: "productId",
        onDelete: "CASCADE",
      });
    }
  }
  Shape.init(
    {
      shapeId: {
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
      modelName: "Shape",
    }
  );
  return Shape;
};
