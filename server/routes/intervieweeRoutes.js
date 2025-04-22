const express = require('express');
const router = express.Router();
const upload = require("../config/multer");
const intervieweeController = require('../controllers/intervieweeController');
const { isAuthenticated } = require('../middleware/auth');
const { roleCheck } = require('../middleware/roleCheck');
const authMiddleware = require('../middleware/auth-middleware');


router.post('/createprofile', authMiddleware, roleCheck(['user']), upload.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), intervieweeController.createProfile);
router.get('/dashboard', isAuthenticated, roleCheck(['interviewee']), intervieweeController.getDashboard);
router.get('/dashboard', isAuthenticated, roleCheck(['interviewee']), intervieweeController.getDashboard);
router.get('/dashboard', isAuthenticated, roleCheck(['interviewee']), intervieweeController.getDashboard);
router.get('/dashboard', isAuthenticated, roleCheck(['interviewee']), intervieweeController.getDashboard);


router.get('/interviews', isAuthenticated, roleCheck(['interviewee']), intervieweeController.viewInterviews);
router.post('/accept/:id', isAuthenticated, roleCheck(['interviewee']), intervieweeController.acceptInterview);
router.post('/reject/:id', isAuthenticated, roleCheck(['interviewee']), intervieweeController.rejectInterview);

module.exports = router;
