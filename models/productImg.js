"use strict";
const Sequelize = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProductImg extends Model {
    static associate(models) {
      ProductImg.belongsTo(models.Product, {
        foreignKey: "productId",
        sourceKey: "productId",
        onDelete: "CASCADE",
      });
    }
  }
  ProductImg.init(
    {
      productImgId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      productImg: {
        allowNull: false,
        type: Sequelize.BLOB,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "ProductImg",
    }
  );
  return ProductImg;
};
