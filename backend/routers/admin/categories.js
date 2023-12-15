const express = require("express");
const router = express.Router();
const categoriesController = require("../../controllers/admin/categories");
const validator = require("../../middlewares/validator");
const verifyUser = require("../../middlewares/verifyUser");
const { paramID, bodyControl } = require("../../validations/categories");

router.get("/", verifyUser, categoriesController.index);
router.post(
  "/",
  verifyUser,
  validator(bodyControl),
  categoriesController.create
);
router.get("/:id", verifyUser, categoriesController.show);
router.put("/:id", verifyUser, validator(paramID), categoriesController.update);
router.delete(
  "/:id",
  verifyUser,
  validator(paramID),
  categoriesController.destroy
);

module.exports = router;
