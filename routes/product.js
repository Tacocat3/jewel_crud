const express = require("express");
const router = express.Router();

const { addProduct, showProductsList } = require("../controller/product")

router.post("/newProduct", addProduct);
router.get("/list", showProductsList);
// router.put("/:productId", modifyingProduct);
// router.delete("/delete/:productId", deleteProduct);

module.exports = router;