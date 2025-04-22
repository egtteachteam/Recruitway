const express = require('express');
const companyRouter = express.Router();
const upload = require("../config/multer");
const { getDashboard, getSuperAdmin, createProfile, getProfile } = require('../controllers/companyController');
const { roleCheck } = require('../middleware/roleCheck');
const authMiddleware = require('../middleware/auth-middleware');

companyRouter.post('/createprofile', authMiddleware, roleCheck(['company']), upload.fields([{ name: 'profilePicture', maxCount: 1 }]), createProfile);
companyRouter.get('/getprofile', authMiddleware, roleCheck(['company']), getProfile);
companyRouter.get('/superAdmin', authMiddleware, getSuperAdmin);
companyRouter.get('/dashboard', authMiddleware, roleCheck(['company']), getDashboard);

module.exports = companyRouter;

