"use strict";
const Sequelize = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProductImage extends Model {
    static associate(models) {
      ProductImage.belongsTo(models.Product, {
        foreignKey: "productId",
        sourceKey: "productId",
        onDelete: "CASCADE",
      });
    }
  }
  ProductImage.init(
    {
      productImageId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      productImageName: {
        allowNull: false,
        type: Sequelize.STRING,
      },  

      productImageType: {
        allowNull: false,
        type: Sequelize.STRING(15),
      },  
    },
    {
      sequelize,
      timestamps: true,
      modelName: "ProductImage",
    }
  );
  return ProductImage;
};
