const User = require('../models/User');
const cloudinary = require("../config/cloudinary");
const Auth = require('../models/Auth/Auth-model');
const SuperAdminProfile = require('../models/Auth/SuperAdmin-model');
const CompanyProfile = require('../models/Auth/Company-model');
const Job = require('../models/Job');
const JobApplication = require('../models/JobApplication-model');
const CandidateProfile = require('../models/Auth/Candidate-model');

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

const getAllCompanies = async (req, res) => {
    try {

        const allCompanyUsers = await Auth.find({ role: "company" }).select("_id");

        if (!allCompanyUsers || allCompanyUsers.length === 0) {
            return res.status(404).json({ message: "No Company found." });
        }

        const companyUserIds = allCompanyUsers.map(user => user._id);

        const companyProfiles = await CompanyProfile.find({ userId: { $in: companyUserIds } });

        if (!companyProfiles || companyProfiles.length === 0) {
            return res.status(404).json({ message: "No company profiles found." });
        }

        const allJobs = await Job.find({ userId: { $in: companyUserIds } });

        const companiesWithJobs = companyProfiles.map(company => {
            const jobs = allJobs.filter(job => job.userId.toString() === company.userId.toString());
            return {
                company,
                jobs
            };
        });

        return res.status(200).json({ companiesWithJobs });

    } catch (error) {
        console.error("Error fetching company data:", error);
        res.status(500).json({ message: "Server error. Please try again later.", error: error.message });
    }
};

const getAllJobsOfSingleCompany = async (req, res) => {
    const { companyId } = req.params;

    if (!companyId) {
        return res.status(400).json({ error: "Company ID is required." });
    }

    try {
        const allJobs = await Job.find({ userId: companyId }).sort({ posted: -1 });

        if (!allJobs || allJobs.length === 0) {
            return res.status(404).json({ message: "No jobs found for this company." });
        }

        return res.status(200).json({ jobs: allJobs });
    } catch (error) {
        console.error("Error fetching company jobs:", error);
        return res.status(500).json({
            error: "Server error. Please try again later.",
            details: error.message
        });
    }
};

const getDetailsOfSingleJob = async (req, res) => {
    const { jobId } = req.params;

    if (!jobId) {
        return res.status(400).json({ message: "Job ID is required." });
    }

    try {
        const jobDetail = await Job.findById(jobId);

        if (!jobDetail) {
            return res.status(404).json({ message: "Job not found." });
        }

        return res.status(200).json({ jobDetail });
    } catch (error) {
        // console.error("Error fetching job details:", error);
        return res.status(500).json({ error: "Server error. Please try again later.", message: error.message });
    }
};

const changeJobStatus = async (req, res) => {
    const { jobId } = req.params;
    const { status } = req.body;

    const validStatuses = ["Active", "Inactive", "Draft"];

    if (!jobId) {
        return res.status(400).json({ message: 'Job ID is required.' });
    }

    if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid or missing job status.' });
    }

    try {
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: 'Job not found.' });
        }

        if (job.status === status) {
            return res.status(400).json({ message: 'Job already has the specified status.' });
        }

        job.status = status;
        await job.save();

        return res.status(200).json({ message: 'Job status updated successfully.' });
    } catch (error) {
        // console.error('Error updating job status:', error);
        return res.status(500).json({ message: 'Server error while updating job status.' });
    }
};

const changeAsFlagged = async (req, res) => {
    const { jobId } = req.params;

    if (!jobId) {
        return res.status(400).json({ message: 'Job ID is required.' });
    }

    try {
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: 'Job not found.' });
        }

        if (job.isFlagged) {
            return res.status(400).json({ message: 'Job is already marked as flagged.' });
        }

        job.isFlagged = true;
        await job.save();

        return res.status(200).json({ message: 'Job successfully marked as flagged.' });
    } catch (error) {
        // console.error('Error marking job as flagged:', error);
        return res.status(500).json({ message: 'Server error while flagging the job.' });
    }
};

const changeAsUnFlagged = async (req, res) => {
    const { jobId } = req.params;

    if (!jobId) {
        return res.status(400).json({ message: 'Job ID is required.' });
    }

    try {
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: 'Job not found.' });
        }

        if (!job.isFlagged) {
            return res.status(400).json({ message: 'Job is not flagged yet.' });
        }

        job.isFlagged = false;
        await job.save();

        return res.status(200).json({ message: 'Job was successfully removed from flagged status.' });

    } catch (error) {
        // console.error('Error marking job as flagged:', error);
        return res.status(500).json({ message: 'Server error while flagging the job.' });
    }
};

const deleteJob = async (req, res) => {
    const { jobId } = req.params;

    try {
        // Find the job by jobId and userId, then delete it
        const job = await Job.findOneAndDelete({ _id: jobId });

        if (!job) {
            return res.status(404).json({ message: "Job not found or unauthorized access." });
        }

        res.status(200).json({ message: "Job deleted successfully." });
    } catch (error) {
        console.error("Error deleting job post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getAllApplicants = async (req, res) => {
    const { jobId } = req.params;

    if (!jobId) {
        return res.status(400).json({ message: "Job ID is required." });
    }

    try {
        // Fetch JobApplications for the given jobId and populate Auth (userId)
        const applications = await JobApplication.find({ "items.jobId": jobId })
            .populate('applicantId') // This gives you the user reference (Auth)
            .lean();

        if (!applications || applications.length === 0) {
            return res.status(404).json({ message: "No applicants found for this job." });
        }

        // Extract the matched application items with applicant IDs
        const filteredApplications = applications.map(app => {
            const item = app.items.find(i => i.jobId.toString() === jobId);
            return item ? { authUser: app.applicantId, item } : null;
        }).filter(Boolean);

        // Fetch CandidateProfiles for those applicants
        const candidateProfiles = await CandidateProfile.find({
            userId: { $in: filteredApplications.map(app => app.authUser._id) }
        }).lean();

        // Map CandidateProfiles by userId for quick lookup
        const profileMap = new Map(candidateProfiles.map(profile => [profile.userId.toString(), profile]));

        // Attach CandidateProfile to each application entry
        const enrichedApplicants = filteredApplications.map(app => ({
            candidateProfile: profileMap.get(app.authUser._id.toString()) || null,
            item: app.item
        }));

        // Fetch the job detail
        const jobDetail = await Job.findById(jobId).lean();
        if (!jobDetail) {
            return res.status(404).json({ message: "Job not found." });
        }

        return res.status(200).json({ job: jobDetail, applicants: enrichedApplicants });

    } catch (error) {
        console.error("Error fetching applicants:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const getSingleApplicants = async (req, res) => {
    const { id } = req.params;

    // Validation: Check if id is provided
    if (!id) {
        return res.status(400).json({ message: "Applicant ID is required." });
    }

    try {
        // Find the applicant profile by user ID
        const applicantProfile = await CandidateProfile.findOne({ userId: id });

        if (!applicantProfile) {
            return res.status(404).json({ message: "Applicant not found." });
        }

        return res.status(200).json({ applicantProfile });
    } catch (error) {
        console.error("Error fetching applicant profile:", error);
        return res.status(500).json({ message: "Internal server error." });
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
    getProfile, createProfile, getAllCompanies, getAllJobsOfSingleCompany, getDetailsOfSingleJob, changeJobStatus,
    changeAsFlagged, changeAsUnFlagged, deleteJob, getAllApplicants, getSingleApplicants,
    getDashboard, manageUsers, createUser, deleteUser
}
