const User = require('../models/User');

exports.getDashboard = async (req, res) => {
    try {
        const users = await User.find();
        res.render('superadmin/dashboard', { user: req.user, users });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving dashboard data' });
    }
};

exports.manageUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.render('superadmin/users', { users });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users' });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const newUser = new User({ name, email, password, role });
        await newUser.save();
        res.redirect('/superadmin/users');
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/superadmin/users');
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};
