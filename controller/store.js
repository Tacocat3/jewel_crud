const { sequelize } = require("../models");
const { QueryTypes } = require("sequelize");

module.exports.addStore = async (req, res) => {
  await addStore(req, res);
};

async function addStore(req, res) {
  try {
    const storeId = req.params.storeId;
    const createStore = await sequelize.query(
      `INSERT INTO stores VALUES (?)`,
      {
        replacements: [storeId],
      }
    );
    res.status(200).json({
      createStore,
      ok: true,
      message: "creation success",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      errorMessage: "creation failed",
    });
  }
}
