"use strict";
const Sequelize = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Store, {
        foreignKey: "storeId",
        sourceKey: "storeId",
        onDelete: "CASCADE",
      });
      Product.hasMany(models.Category, {
        foreignKey: "productId",
        sourceKey: "productId",
      });
      Product.hasMany(models.Base, {
        foreignKey: "productId",
        sourceKey: "productId",
      });
      Product.hasMany(models.Shape, {
        foreignKey: "productId",
        sourceKey: "productId",
      });
      Product.hasMany(models.Gemstone, {
        foreignKey: "productId",
        sourceKey: "productId",
      });
      Product.hasMany(models.Color, {
        foreignKey: "productId",
        sourceKey: "productId",
      });
      Product.hasMany(models.ProductImg, {
        foreignKey: "productId",
        sourceKey: "productId",
      });
    }
  }
  Product.init(
    {
      productId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      storeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      brandName: {
        allowNull: false,
        type: Sequelize.STRING(20),
      },

      productName: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },

      discount: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      originalPrice: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      isTodayDelivery: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('now()')
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('now()')
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Product",
    }
  );
  return Product;
};
