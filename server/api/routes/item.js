const express = require("express");
const router = express.Router();

const itemController = require("../controllers/itemController");

const multer = require("../middlewares/multer");

router.get("/",  itemController.getAllItems);
router.post("/", multer, itemController.addNewItem);
router.get('/:ItemId', itemController.getOneItem);
router.put('/:ItemId', multer, itemController.editItem);
router.delete("/:ItemId", itemController.deleteItem);

module.exports = router;