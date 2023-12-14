const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messages");

router.get("/", messagesController.index);
router.post("/", messagesController.create);
router.get("/:id", messagesController.show);
router.put("/:id", messagesController.update);
router.delete("/:id", messagesController.destroy);

module.exports = router;
