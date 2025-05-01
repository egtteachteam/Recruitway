const express = require('express');
const companyRouter = express.Router();
const upload = require("../config/multer");
const { getDashboard, getSuperAdmin, createProfile, getProfile, createJobPost, getAllJob, updateJobPost, deleteJobPost, getAllJobApplicants, getJobApplicants, updateApplicationStatus, getCompanyNotifications, markAsRead } = require('../controllers/companyController');
const { roleCheck } = require('../middleware/roleCheck');
const authMiddleware = require('../middleware/auth-middleware');
const updateLastActive = require('../middleware/update-lastActive-middleware');

companyRouter.post('/createprofile', authMiddleware, roleCheck(['company']), upload.fields([{ name: 'profilePicture', maxCount: 1 }]), updateLastActive, createProfile);
companyRouter.get('/getprofile', authMiddleware, roleCheck(['company']), getProfile);
companyRouter.get('/superAdmin', authMiddleware, getSuperAdmin);
companyRouter.post('/create-job-post', authMiddleware, roleCheck(['company']), updateLastActive, createJobPost);
companyRouter.get('/get-all-job', authMiddleware, roleCheck(['company']), updateLastActive, getAllJob);
companyRouter.patch("/update-job/:jobId", authMiddleware, roleCheck(['company']), updateLastActive, updateJobPost);
companyRouter.delete("/delete-job/:jobId", authMiddleware, roleCheck(['company']), updateLastActive, deleteJobPost);
companyRouter.get('/allapplicants', authMiddleware, roleCheck(['company']), updateLastActive, getAllJobApplicants);
companyRouter.get('/applicants/:jobId', authMiddleware, roleCheck(['company']), updateLastActive, getJobApplicants);
companyRouter.put("/changeStatus/:applicationId", authMiddleware, updateLastActive, updateApplicationStatus);
companyRouter.get("/getCompanyNotification", authMiddleware, updateLastActive, getCompanyNotifications);
companyRouter.patch("/markAsRead/:companyId", authMiddleware, updateLastActive, markAsRead);








companyRouter.get('/dashboard', authMiddleware, roleCheck(['company']), updateLastActive, getDashboard);

module.exports = companyRouter;

