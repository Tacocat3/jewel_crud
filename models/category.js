"use strict";
const Sequelize = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.belongsTo(models.Product, {
        foreignKey: "productId",
        sourceKey: "productId",
        onDelete: "CASCADE",
      });
      Category.hasMany(models.SubCategory, {
        foreignKey: "categoryId",
        sourceKey: "categoryId",
      });
    }
  }
  Category.init(
    {
      categoryId: {
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
      modelName: "Category",
    }
  );
  return Category;
};
