const express = require("express");
const router = express.Router();
const photosController = require("../controllers/photos");
const validator = require("../middlewares/validator");
const verifyUser = require("../middlewares/validator");
const { paramID, bodyControl } = require("../validations/photos");

router.get("/", photosController.index);
router.post("/", photosController.create);
router.get("/:id", photosController.show);
router.put("/:id", photosController.update);
router.delete("/:id", verifyUser, validator(paramID), photosController.destroy);

module.exports = router;
