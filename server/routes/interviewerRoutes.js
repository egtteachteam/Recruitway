const express = require('express');
const router = express.Router();
const interviewerController = require('../controllers/interviewerController');
const { isAuthenticated } = require('../middleware/auth');
const { roleCheck } = require('../middleware/roleCheck');

router.get('/dashboard', isAuthenticated, roleCheck(['interviewer']), interviewerController.getDashboard);
router.get('/schedule', isAuthenticated, roleCheck(['interviewer']), interviewerController.getScheduledInterviews);
router.post('/update-status/:id', isAuthenticated, roleCheck(['interviewer']), interviewerController.updateInterviewStatus);

module.exports = router;
