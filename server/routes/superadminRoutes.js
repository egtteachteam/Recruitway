const express = require('express');
const router = express.Router();
const superadminController = require('../controllers/superadminController');
const { isAuthenticated } = require('../middleware/auth');
const { roleCheck } = require('../middleware/roleCheck');

router.get('/dashboard', isAuthenticated, roleCheck(['superadmin']), superadminController.getDashboard);
router.get('/users', isAuthenticated, roleCheck(['superadmin']), superadminController.manageUsers);
router.post('/users/create', isAuthenticated, roleCheck(['superadmin']), superadminController.createUser);
router.post('/users/delete/:id', isAuthenticated, roleCheck(['superadmin']), superadminController.deleteUser);

module.exports = router;
