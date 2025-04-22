const CompanyProfile = require('../models/Auth/Company-model');
const Interview = require('../models/Interview');
const User = require('../models/User');
const cloudinary = require("../config/cloudinary");

const getProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        let profile = await CompanyProfile.findOne({ userId });
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

        // Helper function to safely parse JSON strings
        const parseIfString = (value, defaultValue = {}) => {
            try {
                if (typeof value === 'string') {
                    return JSON.parse(value);
                }
                return value || defaultValue;
            } catch (err) {
                return defaultValue;
            }
        };

        // Process file uploads
        let profilePictureUrl = '';
        if (files.profilePicture) {
            const profilePictureResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'company_logos',
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

        // Parse all input data
        const parsedData = {
            fullname: body.fullname || '',
            tagline: body.tagline || '',
            industry: body.industry || '',
            companySize: body.companySize || '',
            headquarters: body.headquarters || '',
            website: body.website || '',
            contactEmail: body.contactEmail || '',
            contactPhone: body.contactPhone || '',
            about: body.about || '',
            keyDetails: parseIfString(body.keyDetails, []),
            history: parseIfString(body.history, []),
            des: parseIfString(body.des, []),
            departments: parseIfString(body.departments, []),
            locations: parseIfString(body.locations, []),
            ceo: {
                ceoName: parseIfString(body.ceo, {}).ceoName || '',
                since: parseIfString(body.ceo, {}).since || ''
            },
            founder: {
                founderName: parseIfString(body.founder, {}).founderName || '',
                currentRole: parseIfString(body.founder, {}).currentRole || ''
            },
            socialMedia: {
                linkedin: parseIfString(body.socialMedia, {}).linkedin || '',
                twitter: parseIfString(body.socialMedia, {}).twitter || '',
                facebook: parseIfString(body.socialMedia, {}).facebook || ''
            },
            ...(profilePictureUrl && { profilePicture: profilePictureUrl })
        };

        // Find and update or create new profile
        const updatedProfile = await CompanyProfile.findOneAndUpdate(
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
        const interviews = await Interview.find({ company: req.user._id }).populate('interviewee interviewer');
        res.render('company/dashboard', { user: req.user, interviews });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving company dashboard data' });
    }
};

const scheduleInterview = async (req, res) => {
    try {
        const { interviewee, interviewer, date, time } = req.body;

        const newInterview = new Interview({
            company: req.user._id,
            interviewee,
            interviewer,
            date,
            time,
            status: 'Scheduled'
        });

        await newInterview.save();
        res.redirect('/company/dashboard');
    } catch (error) {
        res.status(500).json({ message: 'Error scheduling interview' });
    }
};

const getInterviewees = async (req, res) => {
    try {
        const interviewee = await User.find({ role: 'interviewee' });
        res.render('company/interviewee', { interviewee });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving interviewees' });
    }
};

const getInterviewers = async (req, res) => {
    try {
        const interviewer = await User.find({ role: 'interviewer' });
        res.render('company/interviewer', { interviewer });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving interviewer' });
    }
};

const cancelInterview = async (req, res) => {
    try {
        await Interview.findByIdAndDelete(req.params.id);
        res.redirect('/company/dashboard');
    } catch (error) {
        res.status(500).json({ message: 'Error canceling interview' });
    }
};

const getSuperAdmin = async (req, res) => {

    try {
        const superAdmin = await User.findOne({ role: "superadmin" }).select("-password");

        if (!superAdmin || superAdmin.length === 0) {
            return res.status(404).json({ message: "No superAdmin found" });
        }

        // console.log(superAdmin);
        return res.status(200).json({ data: superAdmin });
    } catch (error) {
        // console.error("Error fetching superAdmin:", error); // Logging the error for debugging
        return res.status(500).json({ message: "An error occurred while retrieving superAdmin" });
    }
};

module.exports = { createProfile, getProfile, getDashboard, scheduleInterview, getInterviewees, getInterviewers, cancelInterview, getSuperAdmin }
