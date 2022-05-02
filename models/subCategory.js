"use strict";
const Sequelize = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SubCategory extends Model {
    static associate(models) {
     SubCategory.belongsTo(models.Category, {
        foreignKey: "categoryId",
        sourceKey: "categoryId",
        onDelete: "CASCADE",
      });
      SubCategory.belongsToMany(models.Product, {
        through: "subcategories_products",
        foreignKey: "subCategoryId",
        onDelete: "CASCADE",
        timestamps: false,
      })
    }
  }
  SubCategory.init(
    {
      subCategoryId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER, 
      },

      name: {
        allowNull: false,
        type: Sequelize.STRING(20), 
      },

      subCategoryOrder: {
        allowNull: false,
        type: Sequelize.INTEGER, 
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "SubCategory",
    }
  );
  return SubCategory;
};
