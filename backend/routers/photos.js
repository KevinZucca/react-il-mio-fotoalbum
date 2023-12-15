const express = require("express");
const router = express.Router();
const photosController = require("../controllers/photos");

router.get("/", photosController.index);
router.get("/:id", photosController.show);

module.exports = router;
