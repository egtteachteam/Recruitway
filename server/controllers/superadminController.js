const User = require('../models/User');
const cloudinary = require("../config/cloudinary");
const Auth = require('../models/Auth/Auth-model');
const SuperAdminProfile = require('../models/Auth/SuperAdmin-model');
const CompanyProfile = require('../models/Auth/Company-model');
const Job = require('../models/Job');
const JobApplication = require('../models/JobApplication-model');
const CandidateProfile = require('../models/Auth/Candidate-model');
const Interview = require('../models/Interview-model');
const { default: mongoose } = require('mongoose');
const axios = require("axios");
const { sendInterviewEmail } = require('../utils/interview-emailService');
const Interviewer = require('../models/Interviewer-model');
const getZoomAccessToken = require('../utils/zoomTokenManager');

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

const getAllCompaniesWithJobs = async (req, res) => {
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

const createInterviews = async (req, res) => {
    try {
        const {
            candidateId,
            candidateName,
            interviewerId,
            interviewerName,
            jobId,
            jobTitle,
            companyId,
            companyName,
            location,
            start,
            end,
            notes,
            status = 'scheduled'
        } = req.body;

        // 🔒 Validate required fields
        if (!candidateId || !jobId || !interviewerId || !start || !end || !location) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: candidateId, jobId, interviewerId, start, end, location'
            });
        }

        // 🧠 Fetch related documents
        const [candidate, job, interviewer] = await Promise.all([
            CandidateProfile.findOne({ userId: candidateId }),
            Job.findById(jobId),
            Interviewer.findById(interviewerId)
        ]);

        if (!candidate) return res.status(404).json({ success: false, message: 'Candidate not found' });
        if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
        if (!interviewer) return res.status(404).json({ success: false, message: 'Interviewer not found' });

        // 🕒 Validate dates
        const startDate = new Date(start);
        const endDate = new Date(end);
        if (isNaN(startDate) || isNaN(endDate)) {
            return res.status(400).json({ success: false, message: 'Invalid date format' });
        }
        if (startDate >= endDate) {
            return res.status(400).json({ success: false, message: 'End time must be after start time' });
        }

        // 🚫 Check for conflicts
        const conflictingInterview = await Interview.findOne({
            $or: [
                {
                    interviewerId: interviewer._id,
                    start: { $lt: endDate },
                    end: { $gt: startDate }
                },
                {
                    candidateId,
                    start: { $lt: endDate },
                    end: { $gt: startDate }
                }
            ],
            isActive: true
        });

        if (conflictingInterview) {
            return res.status(409).json({
                success: false,
                message: 'Scheduling conflict detected',
                conflictWith: conflictingInterview.interviewerId.equals(interviewer._id) ? 'interviewer' : 'candidate',
                conflictingInterviewId: conflictingInterview._id
            });
        }

        // 🎥 Create Zoom Meeting
        const accessToken = await getZoomAccessToken();
        const zoomRes = await axios.post(
            'https://api.zoom.us/v2/users/me/meetings',
            {
                topic: `${candidateName} Interview with ${interviewerName}`,
                type: 2,
                start_time: startDate.toISOString(),
                duration: Math.ceil((endDate - startDate) / 60000),
                timezone: 'UTC',
                settings: {
                    host_video: true,
                    participant_video: true,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // 💾 Save interview to DB
        const newInterview = await Interview.create({
            candidateId,
            candidateName,
            jobId,
            jobTitle,
            companyId,
            companyName,
            interviewerId,
            interviewerName,
            start: startDate,
            end: endDate,
            location,
            notes,
            status,
            zoomJoinUrl: zoomRes.data.join_url,
            zoomStartUrl: zoomRes.data.start_url,
            isActive: true
        });

        // 📧 Send confirmation email
        await sendInterviewEmail({
            to: candidate.email,
            subject: 'Interview Scheduled',
            template: 'interviewScheduled',
            context: {
                candidateName: candidate.fullname,
                jobTitle: job.title,
                interviewerName,
                date: startDate.toLocaleDateString(),
                time: startDate.toLocaleTimeString(),
                endTime: endDate.toLocaleTimeString(),
                location,
                notes: notes || 'None provided'
            }
        });

        res.status(201).json({
            success: true,
            message: 'Interview scheduled successfully',
            data: newInterview
        });

    } catch (error) {
        console.error('Error creating interview:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to schedule interview',
            error: error.message
        });
    }
};

const updateInterview = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Basic validation
        const requiredFields = ['candidateId', 'jobId', 'interviewerId', 'interviewerName', 'start', 'end', 'location'];
        for (const field of requiredFields) {
            if (!updateData[field]) {
                return res.status(400).json({
                    success: false,
                    message: `Missing required field: ${field}`
                });
            }
        }

        // Fetch the existing interview
        const existingInterview = await Interview.findById(id);
        if (!existingInterview) {
            return res.status(404).json({ success: false, message: 'Interview not found' });
        }

        // Prevent changing candidate/job for existing interview
        if (existingInterview.candidateId.toString() !== updateData.candidateId ||
            existingInterview.jobId.toString() !== updateData.jobId) {
            return res.status(400).json({
                success: false,
                message: 'Cannot change candidate or job for existing interview'
            });
        }

        // Date handling
        const startDate = new Date(updateData.start);
        const endDate = new Date(updateData.end);
        if (startDate >= endDate) {
            return res.status(400).json({ success: false, message: 'End time must be after start time' });
        }

        // Check for conflicts
        const conflictingInterview = await Interview.findOne({
            _id: { $ne: id },
            start: { $lt: endDate },
            end: { $gt: startDate },
            $or: [
                { interviewerId: updateData.interviewerId },
                { candidateId: updateData.candidateId }
            ]
        });

        if (conflictingInterview) {
            return res.status(409).json({
                success: false,
                message: 'Scheduling conflict detected',
                conflictWith: conflictingInterview.interviewerId.equals(updateData.interviewerId)
                    ? 'interviewer'
                    : 'candidate',
                conflictingInterviewId: conflictingInterview._id
            });
        }

        // Flag if time has changed
        const timeChanged =
            existingInterview.start.getTime() !== startDate.getTime() ||
            existingInterview.end.getTime() !== endDate.getTime();

        // If time changed, delete old Zoom meeting & create new one
        let zoomJoinUrl = existingInterview.zoomJoinUrl;
        let zoomStartUrl = existingInterview.zoomStartUrl;

        if (timeChanged) {
            const accessToken = await getZoomAccessToken();

            // Extract meeting ID from old start_url or join_url
            const oldZoomUrl = existingInterview.zoomStartUrl || existingInterview.zoomJoinUrl;
            const oldMeetingIdMatch = oldZoomUrl?.match(/\/j\/(\d+)/);
            const oldMeetingId = oldMeetingIdMatch?.[1];

            // Delete old Zoom meeting if ID was found
            if (oldMeetingId) {
                await axios.delete(`https://api.zoom.us/v2/meetings/${oldMeetingId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }).catch(err => {
                    console.warn('Zoom meeting deletion failed:', err.response?.data || err.message);
                });
            }

            // Create new Zoom meeting
            const zoomRes = await axios.post(
                'https://api.zoom.us/v2/users/me/meetings',
                {
                    topic: `${updateData.candidateName} Interview`,
                    type: 2,
                    start_time: startDate.toISOString(),
                    duration: Math.ceil((endDate - startDate) / 60000),
                    settings: {
                        host_video: true,
                        participant_video: true
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            zoomJoinUrl = zoomRes.data.join_url;
            zoomStartUrl = zoomRes.data.start_url;
        }

        // Update interview in DB
        const updatedInterview = await Interview.findByIdAndUpdate(
            id,
            {
                $set: {
                    interviewerId: updateData.interviewerId,
                    interviewerName: updateData.interviewerName,
                    start: startDate,
                    end: endDate,
                    location: updateData.location,
                    notes: updateData.notes,
                    status: updateData.status,
                    updatedAt: Date.now(),
                    zoomJoinUrl,
                    zoomStartUrl
                }
            },
            { new: true, runValidators: true }
        ).populate('candidateId', 'fullname email')
            .populate('jobId', 'title');

        // Send update email if time or location changed
        if (
            timeChanged ||
            existingInterview.location !== updateData.location
        ) {
            await sendInterviewEmail({
                to: updatedInterview.candidateId.email,
                subject: 'Your Interview Details Have Changed',
                template: 'interviewUpdate',
                context: {
                    candidateName: updatedInterview.candidateId.fullname,
                    jobTitle: updatedInterview.jobId.title,
                    interviewerName: updatedInterview.interviewerName,
                    date: updatedInterview.start.toLocaleDateString(),
                    oldTime: existingInterview.start.toLocaleString(),
                    newTime: updatedInterview.start.toLocaleString(),
                    endTime: updatedInterview.end.toLocaleString(),
                    oldLocation: existingInterview.location,
                    newLocation: updatedInterview.location,
                    notes: updatedInterview.notes
                }
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Interview updated successfully',
            data: updatedInterview
        });

    } catch (error) {
        console.error('Error updating interview:', error.response?.data || error.message);
        return res.status(500).json({
            success: false,
            message: 'Failed to update interview',
            error: error.message
        });
    }
};

const deleteInterview = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if interview exists and populate candidate and job
        const interview = await Interview.findById(id)
            .populate('candidateId', 'fullname email') // populate candidate fullname and email
            .populate('jobId', 'title');               // populate job title

        if (!interview) {
            return res.status(404).json({
                success: false,
                message: 'Interview not found'
            });
        }

        // Soft delete
        const deletedInterview = await Interview.findByIdAndUpdate(
            id,
            {
                $set: {
                    status: 'cancelled',
                    deletedAt: Date.now(),
                    isActive: false
                }
            },
            { new: true }
        ).populate('candidateId', 'fullname email') // re-populate after update
            .populate('jobId', 'title');

        // Send cancellation email
        await sendInterviewEmail({
            to: deletedInterview.candidateId.email,
            subject: 'Interview Cancellation Notice',
            template: 'interviewCancellation',
            context: {
                candidateName: deletedInterview.candidateId.fullname,
                jobTitle: deletedInterview.jobId.title,
                scheduledTime: deletedInterview.start.toLocaleString(),
                reason: 'Administrative decision'
            }
        });

        res.status(200).json({
            success: true,
            message: 'Interview cancelled successfully',
            data: deletedInterview
        });

    } catch (error) {
        console.error('Error deleting interview:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to cancel interview',
            error: error.message
        });
    }
};

const getAllCompaniesWithVerificationStatus = async (req, res) => {
    try {
        // Find all company users from the Auth model
        const allCompanyUsers = await Auth.find({ role: "company" }).select("_id isVerified");

        if (!allCompanyUsers || allCompanyUsers.length === 0) {
            return res.status(404).json({ message: "No Company found." });
        }

        // Extract company user ids
        const companyUserIds = allCompanyUsers.map(user => user._id);

        // Find company profiles based on userId
        const companyProfiles = await CompanyProfile.find({ userId: { $in: companyUserIds } });

        if (!companyProfiles || companyProfiles.length === 0) {
            return res.status(404).json({ message: "No company profiles found." });
        }

        // Merge `isVerified` from Auth into each company profile
        const companiesWithVerificationStatus = companyProfiles.map(profile => {
            const authUser = allCompanyUsers.find(user => user._id.toString() === profile.userId.toString());
            return {
                ...profile.toObject(), // Spread all fields of the company profile
                isVerified: authUser ? authUser.isVerified : false // Add isVerified from Auth
            };
        });

        res.status(200).json({ companies: companiesWithVerificationStatus });
    } catch (error) {
        // console.error(error);
        res.status(500).json({ message: "Server error while fetching companies." });
    }
};

const makeCompaniesVerified = async (req, res) => {
    const { companyId } = req.params;
    try {
        const updatedCompany = await Auth.findByIdAndUpdate(companyId, { isVerified: true }, { new: true });

        if (!updatedCompany) {
            return res.status(404).json({ message: "Company not found." });
        }

        res.status(200).json({ message: "Company marked as verified." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
};

const makeCompaniesUnverified = async (req, res) => {
    const { companyId } = req.params;
    try {
        const updatedCompany = await Auth.findByIdAndUpdate(companyId, { isVerified: false }, { new: true });

        if (!updatedCompany) {
            return res.status(404).json({ message: "Company not found." });
        }

        res.status(200).json({ message: "Company marked as unverified." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
};

const getAllCandidatesWithVerificationStatus = async (req, res) => {
    try {
        // Find all candidate users from the Auth model
        const allCandidatesUsers = await Auth.find({ role: "user" }).select("_id isVerified");

        if (!allCandidatesUsers || allCandidatesUsers.length === 0) {
            return res.status(404).json({ message: "No Candidates found." });
        }

        // Extract candidate user ids
        const candidateUserIds = allCandidatesUsers.map(user => user._id);

        // Find candidate profiles based on userId
        const candidateProfiles = await CandidateProfile.find({ userId: { $in: candidateUserIds } });

        if (!candidateProfiles || candidateProfiles.length === 0) {
            return res.status(404).json({ message: "No candidate profiles found." });
        }

        // Merge `isVerified` from Auth into each candidate profile
        const candidateWithVerificationStatus = candidateProfiles.map(profile => {
            const authUser = allCandidatesUsers.find(user => user._id.toString() === profile.userId.toString());
            return {
                ...profile.toObject(), // Spread all fields of the candidate profile
                isVerified: authUser ? authUser.isVerified : false // Add isVerified from Auth
            };
        });

        res.status(200).json({ candidates: candidateWithVerificationStatus });
    } catch (error) {
        // console.error(error);
        res.status(500).json({ message: "Server error while fetching candidates." });
    }
};

const makeCandidatesVerified = async (req, res) => {
    const { candidateId } = req.params;

    try {
        const candidate = await Auth.findByIdAndUpdate(
            candidateId,
            { isVerified: true },
            { new: true }
        );

        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found." });
        }
        res.status(200).json({ message: "Candidate marked as verified." });
    } catch (error) {
        console.error("Error verifying candidate:", error);
        res.status(500).json({ message: "Server error." });
    }
};

const makeCandidatesUnverified = async (req, res) => {
    const { candidateId } = req.params;

    try {
        const candidate = await Auth.findByIdAndUpdate(
            candidateId,
            { isVerified: false },
            { new: true }
        );

        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found." });
        }
        res.status(200).json({ message: "Candidate marked as unverified." });
    } catch (error) {
        console.error("Error un-verifying candidate:", error);
        res.status(500).json({ message: "Server error." });
    }
};

const getAllInterviewesOfAllCandidates = async (req, res) => {
    try {
        const interviews = await Interview.find()
            .populate('candidateId', 'name email') // include name and email
            .populate('interviewerId', 'name email') // include name and email
            .lean();

        const userIds = interviews.map(i => i.candidateId?._id).filter(Boolean);

        const profiles = await CandidateProfile.find({ userId: { $in: userIds } })
            .select('userId profilePicture')
            .lean();

        const profileMap = profiles.reduce((acc, profile) => {
            acc[profile.userId.toString()] = profile.profilePicture;
            return acc;
        }, {});

        const formatted = interviews.map((intv) => ({
            isLinkSent: intv.isLinkSent,
            _id: intv._id,
            candidateId: intv.candidateId?._id || null,
            candidateName: intv.candidateId?.name || intv.candidateName,
            candidateEmail: intv.candidateId?.email || null,
            interviewerName: intv.interviewerId?.name || intv.interviewerName,
            interviewerEmail: intv.interviewerId?.email || null,
            profilePicture: profileMap[intv.candidateId?._id?.toString()] || null,
            jobId: intv.jobId,
            jobTitle: intv.jobTitle,
            companyId: intv.companyId,
            companyName: intv.companyName,
            start: intv.start,
            end: intv.end,
            location: intv.location,
            notes: intv.notes,
            status: intv.status,
            isActive: intv.isActive,
            createdAt: intv.createdAt,
            updatedAt: intv.updatedAt,
            __v: intv.__v,
            id: intv.id,
            startLink: intv.zoomStartUrl,
            joinLink: intv.zoomJoinUrl
        }));

        return res.status(200).json({ interviewes: formatted });
    } catch (error) {
        console.error("Error getting interview data:", error);
        return res.status(500).json({ message: error.message });
    }
};

const getCandidateAllInterviews = async (req, res) => {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid candidate ID." });
    }

    try {
        const interviews = await Interview.find({ candidateId: id });
        res.status(200).json({ data: interviews });
    } catch (error) {
        console.error("Error retrieving interviews:", error);
        res.status(500).json({ message: "Error retrieving interview data." });
    }
};

const sendInterviewEmails = async (req, res) => {
    const { id } = req.params;
    const {
        email, interviewerEmail, meetingLink, interviewerMeetingLink, emailSubject, emailMessage, interviewerEmailSubject,
        interviewerEmailMessage, candidateName, interviewerName, jobTitle, scheduledStartTime, scheduledEndTime } = req.body;

    if (
        !email || !interviewerEmail ||
        !meetingLink || !interviewerMeetingLink ||
        !emailSubject || !emailMessage ||
        !interviewerEmailSubject || !interviewerEmailMessage
    ) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Send to Candidate
        await sendInterviewEmail({
            to: email,
            subject: emailSubject,
            template: 'interviewInviteCandidate', // create this EJS template
            context: {
                name: candidateName,
                meetingLink,
                jobTitle,
                scheduledTime: scheduledStartTime - scheduledEndTime,
                message: emailMessage
            }
        });

        // Send to Interviewer
        await sendInterviewEmail({
            to: interviewerEmail,
            subject: interviewerEmailSubject,
            template: 'interviewInviteInterviewer', // create this EJS template
            context: {
                name: interviewerName,
                meetingLink: interviewerMeetingLink,
                jobTitle,
                scheduledTime: scheduledStartTime - scheduledEndTime,
                message: interviewerEmailMessage
            }
        });

        // Optional: mark as sent in DB
        await Interview.findByIdAndUpdate(id, { isLinkSent: true });

        res.status(200).json({ message: "Emails sent successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to send interview emails" });
    }
};

const markAsCancelled = async (req, res) => {
    const { interviewId } = req.params; // Interview ID from route parameters

    try {
        // Find the interview by ID and update its status to "Cancelled"
        const interview = await Interview.findByIdAndUpdate(
            interviewId,
            { status: 'cancelled', isActive: false },
            { new: true }
        );

        if (!interview) {
            return res.status(404).json({ message: 'Interview not found' });
        }
        res.status(200).json({ message: 'Interview status successfully updated to Cancelled' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update interview status', error: err.message });
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
    getProfile, createProfile, getAllCompaniesWithJobs, getAllJobsOfSingleCompany, getDetailsOfSingleJob, changeJobStatus,
    changeAsFlagged, changeAsUnFlagged, deleteJob, getAllApplicants, getSingleApplicants,
    createInterviews, updateInterview, getCandidateAllInterviews, deleteInterview,
    getAllCompaniesWithVerificationStatus, makeCompaniesVerified, makeCompaniesUnverified,
    getAllCandidatesWithVerificationStatus, makeCandidatesVerified, makeCandidatesUnverified, getAllInterviewesOfAllCandidates,
    sendInterviewEmails, markAsCancelled,
    getDashboard, manageUsers, createUser, deleteUser
}
