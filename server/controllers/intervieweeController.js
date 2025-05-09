const CandidateProfile = require('../models/Auth/Candidate-model');
const Interview = require('../models/Interview');
const cloudinary = require("../config/cloudinary");
const Job = require('../models/Job');
const Auth = require('../models/Auth/Auth-model');
const Notification = require('../models/Notification-modal');
const JobApplication = require('../models/JobApplication-model');

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

const applyForJob = async (req, res) => {
    const { jobId, companyId } = req.body;
    const applicantId = req.user._id;

    if (!applicantId || !jobId) {
        return res.status(400).json({ success: false, message: 'UserId and JobId are required.' });
    }

    if (!jobId || !companyId) {
        return res.status(400).json({
            success: false,
            message: 'Job ID and Company ID are required'
        });
    }

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
        return res.status(404).json({
            success: false,
            message: 'Job not found'
        });
    }

    try {
        // Check if the applicant has already applied to this job
        let appliedJob = await JobApplication.findOne({
            applicantId
        });

        if (!appliedJob) {
            // Create new application entry if none exists
            appliedJob = new JobApplication({
                applicantId,
                items: [{ jobId, companyId, status: "Applied" }]
            });
        } else {
            // Ensure the same job isn't applied to again
            const jobAlreadyApplied = appliedJob.items.some(item => item.jobId.toString() === jobId.toString());

            if (jobAlreadyApplied) {
                return res.status(400).json({
                    success: false,
                    message: "You have already applied for this job."
                });
            }

            // Add new job application to existing document
            appliedJob.items.push({ jobId, companyId, status: "Applied" });
        }

        await appliedJob.save();

        // Update the applicantCount field in the Job document
        const updatedJob = await Job.findByIdAndUpdate(jobId, {
            $inc: { applicants: 1 }
        }, { new: true }); // Add { new: true } to return the updated document

        if (!updatedJob) {
            return res.status(404).json({
                success: false,
                message: "Error updating job applicant count"
            });
        }

        // console.log(aaav);


        // await Notification.create({
        //     companyId,
        //     applicantId,
        //     title: 'New Job Application',
        //     message: `${req.user.fullname} has applied for ${job.title} position`,
        //     type: 'application',
        //     priority: 'high',
        //     actionRequired: true,
        //     actionUrl: `/dashboard/jobs/applications/${application._id}`,
        //     actionLabel: 'Review Application',
        //     metadata: {
        //         jobId,
        //         applicationId: application._id,
        //         applicantId,
        //         jobTitle: job.title,
        //         applicantName: req.user.fullname,
        //         applicantPhoto: req.user.profilePicture,
        //     }
        // });

        res.status(201).json({ success: true, message: "Job applied successfully." });
    } catch (error) {
        console.error("Error applying for job:", error.message);
        res.status(500).json({ success: false, message: "Error applying for job", error: error.message });
    }
};

const getAppliedJobs = async (req, res) => {
    const { userId } = req.params;

    try {
        if (!userId) {
            return res.status(400).json({ success: false, message: 'UserId is required' });
        }

        const appliedJobs = await JobApplication.findOne({ applicantId: userId }).populate('items.jobId').lean();

        if (!appliedJobs || appliedJobs.items.length === 0) {
            return res.status(404).json({ success: false, message: 'No applied jobs found.' });
        }

        // Sort items by the job's 'posted' date in descending order
        appliedJobs.items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // const jobsWithStatus = appliedJobs?.items?.map(item => ({
        //     appicationId: item._id,
        //     jobId: item.jobId._id,
        //     title: item.jobId.title,
        //     company: item.jobId.company,
        //     location: item.jobId.location,
        //     salary: item.jobId.salary,
        //     experience: item.jobId.experience,
        //     type: item.jobId.type,
        //     status: item.status,
        //     appliedAt: item.createdAt,
        //     statusDate: item.updatedAt
        // }));

        const jobsWithStatus = appliedJobs?.items?.map(item => {
            const job = item.jobId;

            return {
                applicationId: item._id,
                jobId: job?._id,
                title: job?.title || 'N/A',
                company: job?.company || 'N/A',
                location: job?.location || 'N/A',
                salary: job?.salary || 'N/A',
                experience: job?.experience || 'N/A',
                type: job?.type || 'N/A',
                status: item.status,
                appliedAt: item.createdAt,
                statusDate: item.updatedAt
            };
        });

        res.status(200).json({ success: true, appliedJobs: jobsWithStatus });
    } catch (error) {
        console.error("Error fetching applied jobs:", error.message);
        res.status(500).json({ success: false, message: 'Error fetching applied jobs', error: error.message });
    }
};

const withdrawFromJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const userId = req.user._id;
        // Find the JobApplication document for this user
        const appliedJob = await JobApplication.findOne({ applicantId: userId });

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

const getSelectedJobDetails = async (req, res) => {
    const { jobId } = req.params;

    try {
        if (!jobId) {
            return res.status(400).json({ message: "Job ID is required." });
        }

        const selectedJobDetails = await Job.findById(jobId);

        if (!selectedJobDetails) {
            return res.status(404).json({ message: "Job not found." });
        }

        res.status(200).json({ selectedJobDetails });
    } catch (error) {
        console.error("Error finding job details:", error.message);
        res.status(500).json({ message: "Error finding job details", error: error.message });
    }
};

async function getUserNotifications(req, res) {
    const { companyId } = req.params;

    try {
        const notifications = await Notification.find({ companyId })
            .sort({ createdAt: -1 })
            .lean()
            .exec();

        // Transform notifications to match frontend requirements
        const formattedNotifications = notifications.map(notification => ({
            _id: notification._id,
            id: notification._id.toString(), // For React key purposes
            name: notification.title || 'Notification',
            message: notification.body,
            icon: notification.type === 'alert' ? 'alert-circle' :
                notification.type === 'message' ? 'message' :
                    notification.type === 'update' ? 'refresh' : 'bell',
            timestamp: notification.createdAt,
            read: notification.isRead || false,
            action: notification.actionRequired ? 'View' : null,
            // Additional fields that might be useful
            type: notification.type || 'general',
            priority: notification.priority || 'normal',
            metadata: notification.metadata || {}
        }));

        res.json({
            success: true,
            notifications: formattedNotifications,
            unreadCount: notifications.filter(n => !n.isRead).length,
            lastUpdated: new Date()
        });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch notifications',
            error: error.message
        });
    }
}

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
    getProfile, createProfile, getAllJobs, applyForJob, getUserNotifications, getAppliedJobs, withdrawFromJob, getSelectedJobDetails,
    getDashboard, viewInterviews, acceptInterview, rejectInterview
}
