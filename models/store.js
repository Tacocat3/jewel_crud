"use strict";
const Sequelize = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    static associate(models) {
      Store.hasMany(models.Product, {
        foreignKey: "storeId",
        sourceKey: "storeId",
      });
    }
  }
  Store.init(
    {
      storeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      modelName: "Store",
    }
  );
  return Store;
};
