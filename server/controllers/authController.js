const bcrypt = require('bcrypt');
const Auth = require('../models/Auth/Auth-model');
const CandidateProfile = require('../models/Auth/Candidate-model');
const InterviewerProfile = require('../models/Auth/Interviewer-model');
const CompanyProfile = require('../models/Auth/Company-model');
const SuperAdminProfile = require('../models/Auth/SuperAdmin-model');


const registerController = async (req, res) => {
    const { email, password, role } = req.body
    // console.log(email, password, role);

    try {

        if (!email || !password || !role) {
            return res.status(400).json({ success: false, message: 'All fields are required' })
        }

        // Check if user already exists
        const existedUser = await Auth.findOne({ email: email.toLowerCase() })

        if (existedUser) {
            return res.status(400).json({ success: false, message: 'Email already exists' })
        }

        // Encrypt password

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt)

        // Create a new user
        const userCreated = new Auth({ email: email.toLowerCase(), password: hashPassword, role })

        await userCreated.save()

        return res.status(200).json({ success: true, message: "Registration SuccessFul", path: "waitingReply" })

    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error })
    }
}

const loginController = async (req, res) => {
    const { email, password } = req.body
    // console.log(email, password);

    try {
        // Find User Exist Or Not
        const userExists = await Auth.findOne({ email: email.toLowerCase() })

        if (!userExists) {
            return res.status(400).json({ success: false, message: 'User does not exist' })
        }

        if (!userExists?.isVerified) {
            return res.status(400).json({ success: false, message: 'Thank you for registering. Your account is currently under review and will be verified shortly.' })
        }

        // Check User Password Is Correct Or Not
        const isPasswordCorrect = await bcrypt.compare(password, userExists.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" })
        }
        const userLoggedIn = await Auth.findById(userExists._id).select("-password")

        let path = "";

        switch (userLoggedIn.role) {
            case "superadmin":
                path = "superadmin/dashboard";
                break;
            case "company":
                path = "company/dashboard";
                break;
            case "interviewer":
                path = "interviewer/dashboard";
                break;
            case "interviewee":
                path = "interviewee/dashboard";
                break;
            default:
                path = "user/dashboard";
                break;
        }

        return res.status(200).json({ success: true, message: "Login SuccessFul", token: userLoggedIn.generateToken(), path: path })

    } catch (error) {
        return res.status(400).json({ success: false, message: error })
    }
}

const userController = async (req, res) => {
    try {
        const roleuser = req.user;

        if (!roleuser) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        let profile;

        switch (roleuser.role) {
            case "user":
            case "interviewee":
                profile = await CandidateProfile.findOne({ userId: roleuser._id });
                break;
            case "interviewer":
                profile = await InterviewerProfile.findOne({ userId: roleuser._id });
                break;
            case "company":
                profile = await CompanyProfile.findOne({ userId: roleuser._id });
                break;
            case "superadmin":
                profile = await SuperAdminProfile.findOne({ userId: roleuser._id });
                break;
            default:
                return res.status(400).json({ message: "Invalid user role" });
        }

        const user = {
            ...roleuser.toObject(),
            ...(profile ? profile.toObject() : {})
        };

        return res.status(200).json({ data: user });

    } catch (error) {
        console.error("userController error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// // Logout
// const logout = (req, res) => {
//     req.session.destroy(err => {
//         if (err) {
//             console.error("Logout Error:", err);
//             return res.status(500).send("Logout failed");
//         }
//         res.redirect('/auth/login');
//     });
// };


module.exports = { registerController, loginController, userController } 