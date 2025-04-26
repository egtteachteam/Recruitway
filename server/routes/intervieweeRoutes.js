const express = require('express');
const intervieweeRouter = express.Router();
const upload = require("../config/multer");
const { createProfile, getProfile, checkPassword } = require('../controllers/intervieweeController');
const { isAuthenticated } = require('../middleware/auth');
const { roleCheck } = require('../middleware/roleCheck');
const authMiddleware = require('../middleware/auth-middleware');


intervieweeRouter.post('/createprofile', authMiddleware, roleCheck(['user']), upload.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), createProfile);
intervieweeRouter.get('/getprofile', authMiddleware, roleCheck(['user']), getProfile);




// intervieweeRouter.get('/dashboard', isAuthenticated, roleCheck(['interviewee']), getDashboard);
// intervieweeRouter.get('/dashboard', isAuthenticated, roleCheck(['interviewee']), getDashboard);
// intervieweeRouter.get('/dashboard', isAuthenticated, roleCheck(['interviewee']), getDashboard);
// intervieweeRouter.get('/dashboard', isAuthenticated, roleCheck(['interviewee']), getDashboard);


// intervieweeRouter.get('/interviews', isAuthenticated, roleCheck(['interviewee']), viewInterviews);
// intervieweeRouter.post('/accept/:id', isAuthenticated, roleCheck(['interviewee']), acceptInterview);
// intervieweeRouter.post('/reject/:id', isAuthenticated, roleCheck(['interviewee']), rejectInterview);

module.exports = intervieweeRouter;
