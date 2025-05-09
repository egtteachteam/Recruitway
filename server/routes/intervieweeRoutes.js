const express = require('express');
const intervieweeRouter = express.Router();
const upload = require("../config/multer");
const { createProfile, getProfile, getAllJobs, applyForJob, getAppliedJobs, withdrawFromJob, getSelectedJobDetails } = require('../controllers/intervieweeController');
const { isAuthenticated } = require('../middleware/auth');
const { roleCheck } = require('../middleware/roleCheck');
const authMiddleware = require('../middleware/auth-middleware');
const updateLastActive = require('../middleware/update-lastActive-middleware');


intervieweeRouter.post('/createprofile', authMiddleware, roleCheck(['user']), upload.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), updateLastActive, createProfile);
intervieweeRouter.get('/getprofile', authMiddleware, roleCheck(['user']), getProfile);
intervieweeRouter.get('/getAllJobs', authMiddleware, roleCheck(['user']), updateLastActive, getAllJobs);

intervieweeRouter.post('/apply-job', authMiddleware, roleCheck(['user']), applyForJob);

intervieweeRouter.get("/applied-jobs/:userId", authMiddleware, roleCheck(['user']), getAppliedJobs);
intervieweeRouter.delete('/withdraw-job/:jobId', authMiddleware, roleCheck(['user']), updateLastActive, withdrawFromJob);
intervieweeRouter.get('/get-selected-job-detail/:jobId', authMiddleware, roleCheck(['user']), getSelectedJobDetails);










// intervieweeRouter.get('/dashboard', isAuthenticated, roleCheck(['interviewee']),updateLastActive, getDashboard);
// intervieweeRouter.get('/interviews', isAuthenticated, roleCheck(['interviewee']),updateLastActive, viewInterviews);
// intervieweeRouter.post('/accept/:id', isAuthenticated, roleCheck(['interviewee']),updateLastActive, acceptInterview);
// intervieweeRouter.post('/reject/:id', isAuthenticated, roleCheck(['interviewee']),updateLastActive, rejectInterview);

module.exports = intervieweeRouter;
