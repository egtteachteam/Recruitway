const express = require('express');
const superAdmminRouter = express.Router();
const {
    createProfile, getProfile, getAllCompanies, getAllJobsOfSingleCompany, getDetailsOfSingleJob, changeJobStatus,
    changeAsFlagged, changeAsUnFlagged, deleteJob, getAllApplicants, getSingleApplicants,
} = require('../controllers/superadminController');
const { isAuthenticated } = require('../middleware/auth');
const { roleCheck } = require('../middleware/roleCheck');
const authMiddleware = require('../middleware/auth-middleware');
const upload = require('../config/multer');
const updateLastActive = require('../middleware/update-lastActive-middleware');


superAdmminRouter.post('/createprofile', authMiddleware, roleCheck(['superadmin']), upload.fields([{ name: 'profilePicture', maxCount: 1 }]), updateLastActive, createProfile);
superAdmminRouter.get('/getprofile', authMiddleware, roleCheck(['superadmin']), getProfile);
superAdmminRouter.get('/get-all-companies', authMiddleware, roleCheck(['superadmin']), getAllCompanies);
superAdmminRouter.get('/get-companies-all-jobs/:companyId', authMiddleware, roleCheck(['superadmin']), getAllJobsOfSingleCompany);
superAdmminRouter.get('/getJobDetails/:jobId', authMiddleware, roleCheck(['superadmin']), getDetailsOfSingleJob);
superAdmminRouter.post('/changeJobStatus/:jobId', authMiddleware, roleCheck(['superadmin']), changeJobStatus);
superAdmminRouter.patch('/mark-as-flagged/:jobId', authMiddleware, roleCheck(['superadmin']), changeAsFlagged);
superAdmminRouter.patch('/remove-as-flagged/:jobId', authMiddleware, roleCheck(['superadmin']), changeAsUnFlagged);
superAdmminRouter.delete('/deleteJob/:jobId', authMiddleware, roleCheck(['superadmin']), deleteJob);
superAdmminRouter.get('/getAllApplicants/:jobId', authMiddleware, roleCheck(['superadmin']), getAllApplicants);
superAdmminRouter.get('/getSingleApplicants/:id', authMiddleware, roleCheck(['superadmin']), getSingleApplicants);

// superAdmminRouter.get('/dashboard', isAuthenticated, roleCheck(['superadmin']), superadminController.getDashboard);
// superAdmminRouter.get('/users', isAuthenticated, roleCheck(['superadmin']), superadminController.manageUsers);
// superAdmminRouter.post('/users/create', isAuthenticated, roleCheck(['superadmin']), superadminController.createUser);
// superAdmminRouter.post('/users/delete/:id', isAuthenticated, roleCheck(['superadmin']), superadminController.deleteUser);

module.exports = superAdmminRouter;
