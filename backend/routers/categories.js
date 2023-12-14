const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categories");
const validator = require("../middlewares/validator");
const verifyUser = require("../middlewares/verifyUser");
const { paramID, bodyControl } = require("../validations/categories");

router.get("/", categoriesController.index);
router.post(
  "/",
  verifyUser,
  validator(bodyControl),
  categoriesController.create
);
router.get("/:id", categoriesController.show);
router.put("/:id", verifyUser, validator(paramID), categoriesController.update);
router.delete(
  "/:id",
  verifyUser,
  validator(paramID),
  categoriesController.destroy
);

module.exports = router;
