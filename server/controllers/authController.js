const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const Auth = require('../models/Auth/Auth-model');
const CandidateProfile = require('../models/Auth/Candidate-model');
const InterviewerProfile = require('../models/Auth/Interviewer-model');
const CompanyProfile = require('../models/Auth/Company-model');
const SuperAdminProfile = require('../models/Auth/SuperAdmin-model');
const { sendInterviewEmail } = require('../utils/interview-emailService');


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

const checkPassword = async (req, res) => {
    const userId = req.user?._id;
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ success: false, message: "Password is required" });
    }

    try {
        const user = await Auth.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        return res.status(200).json({ success: true, message: "Password verified successfully" });
    } catch (error) {
        console.error('Password check error:', error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await Auth.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Compare old password
        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }

        // Hash new password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(newPassword, salt);

        // Update password
        user.password = hashPassword;
        await user.save();

        res.status(200).json({ success: true, message: "Password changed successfully" });
    } catch (error) {
        // console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await Auth.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        user.resetToken = token;
        user.tokenExpiry = Date.now() + 15 * 60 * 1000;
        await user.save();

        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

        await sendInterviewEmail({
            to: email,
            subject: 'Reset Your Password',
            template: 'resetPassword',
            context: {
                userName: user.fullname || "User",
                resetLink,
            },
        });

        return res.status(200).json({ message: "Password reset email sent successfully." });
    } catch (error) {
        console.error("Forgot password error:", error);
        res.status(500).json({ message: error.message });
    }
};

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Auth.findById(decoded.id);

        if (!user || user.resetToken !== token || user.tokenExpiry < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(newPassword, salt)

        user.password = hashPassword;
        user.resetToken = undefined;
        user.tokenExpiry = undefined;

        await user.save();
        return res.status(200).json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAccount = async (req, res) => {
    const { password } = req.body;

    try {
        const user = await Auth.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Send farewell email before deleting
        await sendInterviewEmail({
            to: user.email,
            subject: 'Account Deletion Confirmation',
            template: 'accountDeletion', // This refers to views/accountDeletion.ejs
            context: {
                userName: user.fullname || "User"
            }
        });

        // Delete user (actual deletion logic needed here)
        await user.remove();

        res.status(200).json({ message: 'Your account has been successfully deleted.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
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


module.exports = { registerController, loginController, userController, checkPassword, changePassword, forgotPassword, resetPassword, deleteAccount } 