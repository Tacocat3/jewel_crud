const express = require("express");
const router = express.Router();

const { addColor, addCategory, addSubCategory } = require("../controller/setting");

router.post("/color", addColor);
router.post("/category,", addCategory);
router.post("/subcategory", addSubCategory);

module.exports = router;