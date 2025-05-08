const express = require('express');
const superAdmminRouter = express.Router();
const {
    createProfile, getProfile, getAllCompaniesWithJobs, getAllJobsOfSingleCompany, getDetailsOfSingleJob, changeJobStatus,
    changeAsFlagged, changeAsUnFlagged, deleteJob, getAllApplicants, getSingleApplicants, getCandidateAllInterviews,
    createInterviews, updateInterview, deleteInterview, getAllCompaniesWithVerificationStatus, makeCompaniesVerified, makeCompaniesUnverified,
    getAllCandidatesWithVerificationStatus, makeCandidatesVerified, makeCandidatesUnverified, getAllInterviewesOfAllCandidates,
    sendInterviewEmails,markAsCancelled
} = require('../controllers/superadminController');
const { isAuthenticated } = require('../middleware/auth');
const { roleCheck } = require('../middleware/roleCheck');
const authMiddleware = require('../middleware/auth-middleware');
const upload = require('../config/multer');
const updateLastActive = require('../middleware/update-lastActive-middleware');
const { getAllInterviewers, createInterviewer, updateInterviewer, deleteInterviewer } = require('../controllers/interviewerController');


superAdmminRouter.post('/createprofile', authMiddleware, roleCheck(['superadmin']), upload.fields([{ name: 'profilePicture', maxCount: 1 }]), updateLastActive, createProfile);
superAdmminRouter.get('/getprofile', authMiddleware, roleCheck(['superadmin']), getProfile);

superAdmminRouter.get('/get-all-companies-with-jobs', authMiddleware, roleCheck(['superadmin']), getAllCompaniesWithJobs);
superAdmminRouter.get('/get-companies-all-jobs/:companyId', authMiddleware, roleCheck(['superadmin']), getAllJobsOfSingleCompany);
superAdmminRouter.get('/getJobDetails/:jobId', authMiddleware, roleCheck(['superadmin']), getDetailsOfSingleJob);
superAdmminRouter.post('/changeJobStatus/:jobId', authMiddleware, roleCheck(['superadmin']), changeJobStatus);
superAdmminRouter.patch('/mark-as-flagged/:jobId', authMiddleware, roleCheck(['superadmin']), changeAsFlagged);
superAdmminRouter.patch('/remove-as-flagged/:jobId', authMiddleware, roleCheck(['superadmin']), changeAsUnFlagged);
superAdmminRouter.delete('/deleteJob/:jobId', authMiddleware, roleCheck(['superadmin']), deleteJob);

superAdmminRouter.get('/getAllApplicants/:jobId', authMiddleware, roleCheck(['superadmin']), getAllApplicants);
superAdmminRouter.get('/getSingleApplicants/:id', authMiddleware, roleCheck(['superadmin']), getSingleApplicants);

superAdmminRouter.get('/get-all-companies-with-verification-status', authMiddleware, roleCheck(['superadmin']), getAllCompaniesWithVerificationStatus);
superAdmminRouter.patch('/makeCompaniesVerified/:companyId', authMiddleware, roleCheck(['superadmin']), makeCompaniesVerified);
superAdmminRouter.patch('/makeCompaniesUnverified/:companyId', authMiddleware, roleCheck(['superadmin']), makeCompaniesUnverified);

superAdmminRouter.get('/get-all-candidates-with-verification-status', authMiddleware, roleCheck(['superadmin']), getAllCandidatesWithVerificationStatus);
superAdmminRouter.patch('/makeCandidateVerified/:candidateId', authMiddleware, roleCheck(['superadmin']), makeCandidatesVerified);
superAdmminRouter.patch('/makeCandidateUnverified/:candidateId', authMiddleware, roleCheck(['superadmin']), makeCandidatesUnverified);

superAdmminRouter.get('/get-all-interviews-of-all-candidates', authMiddleware, roleCheck(['superadmin']), getAllInterviewesOfAllCandidates);
superAdmminRouter.get('/getCandidateAllInterviews/:id', authMiddleware, roleCheck(['superadmin']), getCandidateAllInterviews);
superAdmminRouter.post('/createInterviewer', authMiddleware, roleCheck(['superadmin']), createInterviewer);
superAdmminRouter.put('/updateInterviewer/:id', authMiddleware, roleCheck(['superadmin']), updateInterviewer);
superAdmminRouter.delete('/deleteInterviewer/:id', authMiddleware, roleCheck(['superadmin']), deleteInterviewer);

superAdmminRouter.post('/candidateandinterviewer/:id/send-invite', authMiddleware, roleCheck(['superadmin']), sendInterviewEmails);
superAdmminRouter.post('/markAsCancelled/:interviewId', authMiddleware, roleCheck(['superadmin']), markAsCancelled);

superAdmminRouter.get('/getAllInterviewers', authMiddleware, roleCheck(['superadmin']), getAllInterviewers);

superAdmminRouter.post('/createInterviews', authMiddleware, roleCheck(['superadmin']), createInterviews);
superAdmminRouter.put('/updateInterviews/:id', updateInterview);
superAdmminRouter.delete('/deleteInterviews/:id', deleteInterview);






// superAdmminRouter.get('/dashboard', isAuthenticated, roleCheck(['superadmin']), superadminController.getDashboard);
// superAdmminRouter.get('/users', isAuthenticated, roleCheck(['superadmin']), superadminController.manageUsers);
// superAdmminRouter.post('/users/create', isAuthenticated, roleCheck(['superadmin']), superadminController.createUser);
// superAdmminRouter.post('/users/delete/:id', isAuthenticated, roleCheck(['superadmin']), superadminController.deleteUser);

module.exports = superAdmminRouter;
