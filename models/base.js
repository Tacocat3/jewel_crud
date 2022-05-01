"use strict";
const Sequelize = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Base extends Model {
    static associate(models) {
     Base.belongsTo(models.Product, {
        foreignKey: "productId",
        sourceKey: "productId",
        onDelete: "CASCADE",
      });
    }
  }
  Base.init(
    {
      baseId: {
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
      modelName: "Base",
    }
  );
  return Base;
};
