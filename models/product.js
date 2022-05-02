"use strict";
const Sequelize = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {  
      Product.hasMany(models.ProductImage, {
        foreignKey: "productId",
        sourceKey: "productId",
      });
      Product.belongsToMany(models.Color, {
        through: "color_products",
        foreignKey: "productId",
        onDelete: "CASCADE",
        timestamps: false,
      });
      Product.belongsToMany(models.SubCategory, {
        through: "subcategories_products",
        foreignKey: "productId",
        onDelete: "CASCADE",
        timestamps: false,
      })
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
        defaultValue: Sequelize.literal("now()"),
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("now()"),
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
