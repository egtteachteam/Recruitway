const express = require('express');
const companyRouter = express.Router();
const upload = require("../config/multer");
const { getDashboard, getSuperAdmin, createProfile, getProfile, createJobPost, getAllJob, updateJobPost } = require('../controllers/companyController');
const { roleCheck } = require('../middleware/roleCheck');
const authMiddleware = require('../middleware/auth-middleware');

companyRouter.post('/createprofile', authMiddleware, roleCheck(['company']), upload.fields([{ name: 'profilePicture', maxCount: 1 }]), createProfile);
companyRouter.get('/getprofile', authMiddleware, roleCheck(['company']), getProfile);
companyRouter.get('/superAdmin', authMiddleware, getSuperAdmin);
companyRouter.post('/create-job-post', authMiddleware, roleCheck(['company']), createJobPost);
companyRouter.get('/get-all-job', authMiddleware, roleCheck(['company']), getAllJob);
companyRouter.patch("/update-job/:jobId", authMiddleware, roleCheck(['company']), updateJobPost);







companyRouter.get('/dashboard', authMiddleware, roleCheck(['company']), getDashboard);

module.exports = companyRouter;

