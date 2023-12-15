const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categories");

router.get("/", categoriesController.index);
router.get("/:id", categoriesController.show);

module.exports = router;
