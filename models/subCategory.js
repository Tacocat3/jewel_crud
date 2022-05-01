"use strict";
const Sequelize = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SubCategory extends Model {
    static associate(models) {
     SubCategory.belongsTo(models.SubCategory, {
        foreignKey: "categoryId",
        sourceKey: "categoryId",
        onDelete: "CASCADE",
      });
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
    },
    {
      sequelize,
      timestamps: true,
      modelName: "SubCategory",
    }
  );
  return SubCategory;
};
