const express = require("express");
const router = express.Router();

const { addProduct, showProductsList, modifyingProduct } = require("../controller/product")

router.post("/newProduct", addProduct);
router.get("/list", showProductsList);
router.patch("/:productId", modifyingProduct);
// router.delete("/delete/:productId", deleteProduct);

module.exports = router;