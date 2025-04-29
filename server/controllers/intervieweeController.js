const CandidateProfile = require('../models/Auth/Candidate-model');
const Interview = require('../models/Interview');
const cloudinary = require("../config/cloudinary");
const Job = require('../models/Job');
const ApplyJob = require('../models/ApplyJob');
const Auth = require('../models/Auth/Auth-model');

const getProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        let profile = await CandidateProfile.findOne({ userId });
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

        // Parse stringified fields from FormData
        const parsedData = {
            fullname: body.fullname,
            headline: body.headline,
            location: body.location,
            phone: body.phone,
            summary: body.summary,
            gender: body.gender,
            dob: body.dob,
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

        const user = await Auth.findOne({ _id: userId }).select("email")

        // Prepare profile data
        const profileData = {
            userId,
            email: user.email,
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

// Get all active jobs
const getAllJobs = async (req, res) => {
    try {
        const allJobs = await Job.find({ status: "Active" }).sort({ posted: -1 })

        if (!allJobs || allJobs.length === 0) {
            return res.status(404).json({ message: "No active jobs found." });
        }

        res.status(200).json({ allJobs });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};

// Apply for a job
const applyForJob = async (req, res) => {
    const { jobId } = req.body;
    const userId = req.user._id?.toString();

    if (!userId || !jobId) {
        return res.status(400).json({ success: false, message: 'UserId and JobId are required.' });
    }

    try {
        let appliedJob = await ApplyJob.findOne({ userId });

        if (!appliedJob) {
            // First time applying, create a new document
            appliedJob = new ApplyJob({
                userId,
                items: [{ jobId, status: "Applied" }]
            });
        } else {
            const jobAlreadyApplied = appliedJob.items.some(item => item.jobId.toString() === jobId);

            if (jobAlreadyApplied) {
                return res.status(400).json({ success: false, message: "You have already applied for this job." });
            }

            appliedJob.items.push({ jobId, status: "Applied" });
        }

        await appliedJob.save();

        res.status(201).json({ success: true, message: "Job applied successfully." });
    } catch (error) {
        console.error("Error applying for job:", error.message);
        res.status(500).json({ success: false, message: "Error applying for job", error: error.message });
    }
};

// Get all jobs a user has applied to
const getAppliedJobs = async (req, res) => {
    const { userId } = req.params;

    try {
        if (!userId) {
            return res.status(400).json({ success: false, message: 'UserId is required' });
        }

        const appliedJobs = await ApplyJob.findOne({ userId }).populate('items.jobId').lean();

        if (!appliedJobs || appliedJobs.items.length === 0) {
            return res.status(404).json({ success: false, message: 'No applied jobs found.' });
        }

        // Sort items by the job's 'posted' date in descending order
        appliedJobs.items.sort((a, b) => new Date(b.jobId.posted) - new Date(a.jobId.posted));

        const jobsWithStatus = appliedJobs.items.map(item => ({
            appicationId: item._id,
            jobId: item.jobId._id,
            title: item.jobId.title,
            company: item.jobId.company,
            location: item.jobId.location,
            salary: item.jobId.salary,
            experience: item.jobId.experience,
            type: item.jobId.type,
            status: item.status,
            appliedAt: appliedJobs.createdAt,
            statusDate: appliedJobs.updatedAt
        }));

        res.status(200).json({ success: true, appliedJobs: jobsWithStatus });
    } catch (error) {
        console.error("Error fetching applied jobs:", error.message);
        res.status(500).json({ success: false, message: 'Error fetching applied jobs', error: error.message });
    }
};

// Withdraw from applied job (for applicants)
const withdrawFromJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const userId = req.user._id;  // User's ID

        // Find the ApplyJob document for this user
        const appliedJob = await ApplyJob.findOne({ userId });

        if (!appliedJob) {
            return res.status(404).json({ message: "No application found for this user." });
        }

        // Find the specific job in the items array
        const jobIndex = appliedJob.items.findIndex(item => item.jobId.toString() === jobId);

        if (jobIndex === -1) {
            return res.status(404).json({ message: "Job not found in application list." });
        }

        // Remove the job application from the items array
        appliedJob.items.splice(jobIndex, 1);

        // Save the updated ApplyJob document
        await appliedJob.save();

        res.status(200).json({ message: "Application withdrawn successfully" });
    } catch (error) {
        console.error("Error withdrawing from job:", error.message);
        res.status(500).json({ message: "Error withdrawing from job", error: error.message });
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

module.exports = {
    getProfile, createProfile, getAllJobs, applyForJob, getAppliedJobs, withdrawFromJob,
    getDashboard, viewInterviews, acceptInterview, rejectInterview
}
