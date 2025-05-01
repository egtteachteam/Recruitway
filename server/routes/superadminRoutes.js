const express = require('express');
const superAdmminRouter = express.Router();
const { createProfile, getProfile } = require('../controllers/superadminController');
const { isAuthenticated } = require('../middleware/auth');
const { roleCheck } = require('../middleware/roleCheck');
const authMiddleware = require('../middleware/auth-middleware');
const upload = require('../config/multer');
const updateLastActive = require('../middleware/update-lastActive-middleware');


superAdmminRouter.post('/createprofile', authMiddleware, roleCheck(['superadmin']), upload.fields([{ name: 'profilePicture', maxCount: 1 }]), updateLastActive, createProfile);
superAdmminRouter.get('/getprofile', authMiddleware, roleCheck(['superadmin']), getProfile);

// superAdmminRouter.get('/dashboard', isAuthenticated, roleCheck(['superadmin']), superadminController.getDashboard);
// superAdmminRouter.get('/users', isAuthenticated, roleCheck(['superadmin']), superadminController.manageUsers);
// superAdmminRouter.post('/users/create', isAuthenticated, roleCheck(['superadmin']), superadminController.createUser);
// superAdmminRouter.post('/users/delete/:id', isAuthenticated, roleCheck(['superadmin']), superadminController.deleteUser);

module.exports = superAdmminRouter;
