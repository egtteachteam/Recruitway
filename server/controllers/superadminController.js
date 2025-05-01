const User = require('../models/User');
const cloudinary = require("../config/cloudinary");
const Auth = require('../models/Auth/Auth-model');
const SuperAdminProfile = require('../models/Auth/SuperAdmin-model');

const getProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        let profile = await SuperAdminProfile.findOne({ userId });
        return res.status(200).json({ data: profile })

    } catch (error) {
        console.error("Error getiing company profile:", error);
        return res.status(500).json({ message: error.message });
    }
}

const createProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const files = req.files || {};
        const body = req.body;

        // Process file uploads
        let profilePictureUrl = '';
        if (files.profilePicture) {
            const profilePictureResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'Super_Admin_Profile_Pic',
                        transformation: [{ width: 500, height: 500, crop: 'limit' }]
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(files.profilePicture[0].buffer);
            });
            profilePictureUrl = profilePictureResult.secure_url;
        }

        const user = await Auth.findOne({ _id: userId }).select("email")

        // Parse all input data
        const parsedData = {
            fullname: body.fullName || '',
            email: user.email || "",
            phone: body.phoneNumber || "",
            address: body.address || "",
            ...(profilePictureUrl && { profilePicture: profilePictureUrl })
        };

        // Find and update or create new profile
        const updatedProfile = await SuperAdminProfile.findOneAndUpdate(
            { userId },
            { $set: parsedData },
            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true,
                runValidators: true
            }
        );

        return res.status(200).json({
            success: true,
            message: "Profile saved successfully",
            profile: updatedProfile
        });

    } catch (error) {
        console.error('Error saving profile:', error);

        // Handle specific error types
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                error: error.message
            });
        }

        if (error.message.includes('Cloudinary')) {
            return res.status(500).json({
                success: false,
                message: 'File upload failed',
                error: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const getDashboard = async (req, res) => {
    try {
        const users = await User.find();
        res.render('superadmin/dashboard', { user: req.user, users });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving dashboard data' });
    }
};

const manageUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.render('superadmin/users', { users });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users' });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const newUser = new User({ name, email, password, role });
        await newUser.save();
        res.redirect('/superadmin/users');
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
};

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/superadmin/users');
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};

module.exports = {
    getProfile, createProfile, getDashboard, manageUsers, createUser, deleteUser
}
