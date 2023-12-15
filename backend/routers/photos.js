const express = require("express");
const router = express.Router();
const photosController = require("../controllers/photos");
const validator = require("../middlewares/validator");
const verifyUser = require("../middlewares/verifyUser");
const { paramID, bodyControl } = require("../validations/photos");

router.get("/", photosController.index);
router.post("/", validator(bodyControl), photosController.create);
router.get("/:id", photosController.show);
router.put("/:id", verifyUser, validator(paramID), photosController.update);
router.delete("/:id", verifyUser, validator(paramID), photosController.destroy);

module.exports = router;
