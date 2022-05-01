const express = require("express");
const router = express.Router();

const { addStore } = require("../controller/store")

router.post("/newStore/:storeId", addStore);

module.exports = router;