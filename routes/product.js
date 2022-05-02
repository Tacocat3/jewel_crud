const express = require("express");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets/images");
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

const {
  addProduct,
  showProductsList,
  showProductDetail,
  modifyingProduct,
  deleteProduct,
} = require("../controller/product");

router.post("/newProduct", upload.fields([{name: "main"}, {name: "description"}]), addProduct);
router.get("/list", showProductsList);
router.get("/:productId", showProductDetail);
router.patch("/:productId", modifyingProduct);
router.delete("/:productId", deleteProduct);

module.exports = router;
