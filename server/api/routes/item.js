const express = require("express");
const router = express.Router();

const auth = require('../middlewares/auth');

const itemController = require("../controllers/itemController");

const multer = require("../middlewares/multer");

router.get("/", auth,  itemController.getAllItems);
router.post("/", auth, multer, itemController.addNewItem);
router.get('/:ItemId', auth, itemController.getOneItem);
router.put('/:ItemId', auth, multer, itemController.editItem);
router.delete("/:ItemId", auth, itemController.deleteItem);

module.exports = router;