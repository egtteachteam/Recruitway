const express = require('express');
const router = express.Router();
const { registerController, loginController, userController, checkPassword, forgotPassword, changePassword, resetPassword, deleteAccount } = require("../controllers/authController");
const authMiddleware = require('../middleware/auth-middleware');

router.post("/register", registerController)
router.post("/login", loginController)
router.get("/user", authMiddleware, userController)
router.post("/checkPassword", authMiddleware, checkPassword)
router.post("/forgot-password", forgotPassword)
router.post("/change-password", authMiddleware, changePassword)
router.post("/reset-password/:token", resetPassword)
router.delete("/delete-account", authMiddleware, deleteAccount)

module.exports = router;
