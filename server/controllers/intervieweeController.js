const CandidateProfile = require('../models/Auth/Candidate-model');
const Interview = require('../models/Interview');
const cloudinary = require("../config/cloudinary");

const createProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const files = req.files || {};
        const body = req.body;

        // Parse stringified fields from FormData
        const parsedData = {
            fullname: body.fullname,
            headline: body.headline,
            location: body.location,
            phone: body.phone,
            summary: body.summary,
            socialMedia: JSON.parse(body.socialMedia || '{}'),
            experience: JSON.parse(body.experience || '[]'),
            education: JSON.parse(body.education || '[]'),
            skills: JSON.parse(body.skills || '[]'),
            certifications: JSON.parse(body.certifications || '[]'),
            languages: JSON.parse(body.languages || '[]'),
            projects: JSON.parse(body.projects || '[]')
        };

        // Upload profile picture to Cloudinary if exists
        let profilePictureUrl = '';
        if (files.profilePicture) {
            const profilePicResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'profile_pictures',
                        transformation: [{ width: 500, height: 500, crop: 'limit' }]
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(files.profilePicture[0].buffer);
            });
            profilePictureUrl = profilePicResult.secure_url;
        }

        // Upload resume to Cloudinary if exists
        let resumeUrl = '';
        if (files.resume) {
            const resumeResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'resumes',
                        resource_type: 'raw'
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(files.resume[0].buffer);
            });
            resumeUrl = resumeResult.secure_url;
        }

        // Prepare profile data
        const profileData = {
            userId,
            ...parsedData,
            ...(profilePictureUrl && { profilePicture: profilePictureUrl }),
            ...(resumeUrl && { resume: resumeUrl })
        };

        // Find existing profile or create new one
        let profile = await CandidateProfile.findOneAndUpdate(
            { userId },
            profileData,
            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true // Ensures default values are set for new documents
            }
        );

        res.status(201).json({
            success: true,
            message: 'Profile saved successfully',
            profile
        });

    } catch (err) {
        console.error('Error saving profile:', err);

        // Handle JSON parse errors specifically
        if (err instanceof SyntaxError) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data format',
                error: 'Malformed JSON in one of the fields'
            });
        }

        // Handle Cloudinary errors
        if (err.message.includes('Cloudinary')) {
            return res.status(500).json({
                success: false,
                message: 'File upload failed',
                error: err.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to save profile',
            error: err.message
        });
    }
};

const getDashboard = (req, res) => {
    res.render('interviewee/dashboard', { user: req.user });
};

const viewInterviews = async (req, res) => {
    try {
        const interviews = await Interview.find({ interviewee: req.user._id }).populate('company interviewer');
        res.render('interviewee/interviews', { interviews });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving interviews' });
    }
};

const acceptInterview = async (req, res) => {
    try {
        await Interview.findByIdAndUpdate(req.params.id, { status: 'Accepted' });
        res.redirect('/interviewee/interviews');
    } catch (error) {
        res.status(500).json({ message: 'Error accepting interview' });
    }
};

const rejectInterview = async (req, res) => {
    try {
        await Interview.findByIdAndUpdate(req.params.id, { status: 'Rejected' });
        res.redirect('/interviewee/interviews');
    } catch (error) {
        res.status(500).json({ message: 'Error rejecting interview' });
    }
};

module.exports = { createProfile, getDashboard, viewInterviews, acceptInterview, rejectInterview }
