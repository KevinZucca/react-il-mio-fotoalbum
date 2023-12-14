const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categories");

router.get("/", categoriesController.index);
router.post("/", categoriesController.create);
router.get("/:id", categoriesController.show);
router.put("/:id", categoriesController.update);
router.delete("/:id", categoriesController.destroy);

module.exports = router;
