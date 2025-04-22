const express = require('express');
const router = express.Router();
const { registerController, loginController, userController } = require("../controllers/authController");
const authMiddleware = require('../middleware/auth-middleware');

router.post("/register", registerController)
router.post("/login", loginController)
router.get("/user", authMiddleware, userController)



module.exports = router;
