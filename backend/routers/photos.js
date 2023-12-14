const express = require("express");
const router = express.Router();
const photosController = require("../controllers/photos");

router.get("/", photosController.index);
// router.post("/", photosController.create);
// router.get("/:id", photosController.show);
// router.put("/:id", photosController.update);
// router.delete("/:id", photosController.destroy);

module.exports = router;
