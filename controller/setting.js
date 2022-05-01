const { sequelize } = require("../models");
const { QueryTypes } = require("sequelize");

//색상 등록
module.exports.addColor = async (req, res) => {
  await addColor(req, res);
};

//카테고리 등록
module.exports.addCategory = async (req, res) => {
  await addCategory(req, res);
};

//서브 카테고리 등록
module.exports.addSubCategory = async (req, res) => {
    await addSubCategory(req, res);
  };

async function addColor(req, res) {
  try {
    const colorName = req.body.colorName;
    const addColorQuery = await sequelize.query(
      `INSERT INTO colors (name)
       VALUES(?);`,
      {
        replacements: [colorName],
        type: QueryTypes.INSERT,
      }
    );
    res.status(200).json({
      addColorQuery,
      ok: true,
      message: "creation success",
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      errorMessage: "Invalid request",
    });
  }
};

async function addCategory(req, res) {
    try {
      const categoryName = req.body.categoryName;
      const categoryOrder = req.body.categoryOrder;
      const addCategoryQuery = await sequelize.query(
        `INSERT INTO categories (name, order)
         VALUES(?, ?);`,
        {
          replacements: [categoryName, categoryOrder],
          type: QueryTypes.INSERT,
        }
      );
      res.status(200).json({
        addCategoryQuery,
        ok: true,
        message: "creation success",
      });
    } catch (error) {
      res.status(400).json({
        ok: false,
        errorMessage: "Invalid request",
      });
    }
  };

  async function addSubCategory(req, res) {
    try {
      const subCategoryName = req.body.subCategoryName;
      const subCategoryOrder = req.body.subCategoryOrder;
      const addSubCategoryQuery = await sequelize.query(
        `INSERT INTO subcategories (name, order)
         VALUES(?, ?);`,
        {
          replacements: [subCategoryName, subCategoryOrder],
          type: QueryTypes.INSERT,
        }
      );
      res.status(200).json({
        addSubCategoryQuery,
        ok: true,
        message: "creation success",
      });
    } catch (error) {
      res.status(400).json({
        ok: false,
        errorMessage: "Invalid request",
      });
    }
  };
