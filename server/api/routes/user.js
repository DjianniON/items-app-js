const express = require("express");
const router = express.Router();

const auth = require('../middlewares/auth');

const userController = require("../controllers/userController");

router.post("/signup", userController.signUp);
router.post("/login", userController.login);

module.exports = router;