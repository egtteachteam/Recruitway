const CompanyProfile = require('../models/Auth/Company-model');
const Interview = require('../models/Interview');
const User = require('../models/User');

// const createProfile = async (req, res) => {
//     try {
//         const userId = req.user._id;
//         const updateData = req.body;

//         console.log(updateData);


//         let profile = await CompanyProfile.findOne({ userId });

//         if (!profile) {
//             profile = new CompanyProfile({ userId, ...updateData });
//             await profile.save();
//             console.log(profile);

//             return res.status(201).json({ message: "Profile created successfully", profile });
//         }

//         Object.entries(updateData).forEach(([key, value]) => {
//             if (Array.isArray(value)) {
//                 profile[key] = value;
//             } else if (typeof value === 'object' && value !== null) {
//                 profile[key] = {
//                     ...profile[key],
//                     ...value
//                 };
//             } else {
//                 profile[key] = value;
//             }
//         });

//         await profile.save();
//         return res.status(200).json({ message: "Profile updated successfully", profile });

//     } catch (error) {
//         console.error("Error updating company profile:", error);
//         return res.status(500).json({ message: error.message });
//     }
// };


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
        const updateData = req.body;
        const userId = req.user._id;

        if (req.file) {
            updateData.logo = req.file.path;
        }

        let profile = await CompanyProfile.findOne({ userId });

        if (!profile) {
            const parseIfString = (value) => {
                try {
                    return typeof value === 'string' ? JSON.parse(value) : value;
                } catch (err) {
                    return value;
                }
            };

            // Pre-parse all possibly stringified fields (especially arrays or objects)
            const ceoInput = parseIfString(updateData.ceo) || {};
            const founderInput = parseIfString(updateData.founder) || {};
            const socialMediaInput = parseIfString(updateData.socialMedia) || {};
            const keyDetailsInput = parseIfString(updateData.keyDetails) || [];
            const historyInput = parseIfString(updateData.history) || [];
            const desInput = parseIfString(updateData.des) || [];
            const departmentsInput = parseIfString(updateData.departments) || [];
            const locationsInput = parseIfString(updateData.locations) || [];

            const newProfile = new CompanyProfile({
                userId,
                logo: updateData.logo || "",
                fullname: updateData.fullname || "",
                tagline: updateData.tagline || "",
                industry: updateData.industry || "",
                companySize: updateData.companySize || "",
                headquarters: updateData.headquarters || "",

                keyDetails: keyDetailsInput,
                history: historyInput,
                des: desInput,
                departments: departmentsInput,
                locations: locationsInput,

                ceo: {
                    ceoName: ceoInput.ceoName || "",
                    since: ceoInput.since || ""
                },
                founder: {
                    founderName: founderInput.founderName || "",
                    currentRole: founderInput.currentRole || ""
                },

                website: updateData.website || "",
                contactEmail: updateData.contactEmail || "",
                contactPhone: updateData.contactPhone || "",
                about: updateData.about || "",

                socialMedia: {
                    linkedin: socialMediaInput.linkedin || "",
                    twitter: socialMediaInput.twitter || "",
                    facebook: socialMediaInput.facebook || ""
                }
            });
            await newProfile.save();
        }

        const parseIfString = (value) => {
            try {
                return typeof value === 'string' ? JSON.parse(value) : value;
            } catch {
                return value;
            }
        };

        const ceoInput = parseIfString(updateData.ceo) || {};
        const founderInput = parseIfString(updateData.founder) || {};
        const socialMediaInput = parseIfString(updateData.socialMedia) || {};

        const keyDetailsInput = parseIfString(updateData.keyDetails) || profile.keyDetails;
        const historyInput = parseIfString(updateData.history) || profile.history;
        const desInput = parseIfString(updateData.des) || profile.des;
        const departmentsInput = parseIfString(updateData.departments) || profile.departments;
        const locationsInput = parseIfString(updateData.locations) || profile.locations;

        const updateFields = {
            logo: updateData.logo || profile.logo,
            fullname: updateData.fullname || profile.fullname,
            tagline: updateData.tagline || profile.tagline,
            industry: updateData.industry || profile.industry,
            companySize: updateData.companySize || profile.companySize,
            headquarters: updateData.headquarters || profile.headquarters,
            keyDetails: keyDetailsInput,
            ceo: {
                ceoName: ceoInput.ceoName || profile.ceo.ceoName,
                since: ceoInput.since || profile.ceo.since
            },
            founder: {
                founderName: founderInput.founderName || profile.founder.founderName,
                currentRole: founderInput.currentRole || profile.founder.currentRole
            },
            website: updateData.website || profile.website,
            contactEmail: updateData.contactEmail || profile.contactEmail,
            contactPhone: updateData.contactPhone || profile.contactPhone,
            about: updateData.about || profile.about,
            history: historyInput,
            des: desInput,
            departments: departmentsInput,
            locations: locationsInput,
            socialMedia: {
                linkedin: socialMediaInput.linkedin || profile.socialMedia.linkedin,
                twitter: socialMediaInput.twitter || profile.socialMedia.twitter,
                facebook: socialMediaInput.facebook || profile.socialMedia.facebook
            }
        };
        
        const updatedProfile = await CompanyProfile.findOneAndUpdate(
            { userId },
            { $set: updateFields },
            { new: true }
        );

        return res.status(200).json({
            message: "Profile updated successfully",
            profile: updatedProfile
        });

    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({
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
