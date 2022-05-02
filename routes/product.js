const express = require("express");
const router = express.Router();

const { addProduct, showProductsList, showProductDetail, modifyingProduct, deleteProduct } = require("../controller/product")

router.post("/newProduct", addProduct);
router.get("/list", showProductsList);
router.get("/:productId", showProductDetail);
router.patch("/:productId", modifyingProduct);
router.delete("/:productId", deleteProduct);

module.exports = router;