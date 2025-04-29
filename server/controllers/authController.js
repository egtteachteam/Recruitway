const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
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
        user.tokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes
        await user.save();

        // Send email
        const transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            port: 465,
            secure: true,
            auth: {
                user: "no-reply@anand",
                pass: "no-replyAnand",
            },
        });

        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
        const mailOptions = {
            from: "no-reply@anand",
            to: email,
            subject: 'Password Reset Request',
            text: `Click the link to reset your password: ${resetLink}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "A link to set a new password will be sent to your email address." });
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: error.message });
    }
};

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
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
        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAccount = async (req, res) => {
    const { password } = req.body;
    try {
        // Get the user from the request (attached by authMiddleware)
        const user = await Auth.findById(req.user._id)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" })
        }

        // Step 1: Save user data to the DeletedAccount model
        const deletedAccount = new DeletedAuth({
            name: user.name,
            email: user.email,
            phone: user.phone,
            organization: user.organization,
            password: user.password,
            isAdmin: user.isAdmin,
            role: user.role,
            term_condition: user.term_condition,
            address: user.address
        });

        // Save the deleted account data
        await deletedAccount.save();

        await Cart.deleteMany({ userId: user._id }); // Delete user's cart items
        await WishList.deleteMany({ userId: user._id }); // Delete user's wishlist items
        await Address.deleteMany({ userId: user._id }); // Delete user's saved addresses

        // Step 2: Delete the user's account from the Auth model (user model)
        await user.deleteOne(); // delete the current user document from the database

        // Send email
        const transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            port: 465,
            secure: true,
            auth: {
                user: "no-reply@anand",
                pass: "no-replyAnand",
            },
        });;

        const mailOptions = {
            from: "no-reply@anand",
            to: user.email,
            subject: 'Account Deletion Confirmation',
            text: `Dear ${user.name},\n\nWe are sorry to see you go. Your account has been successfully deleted along with all associated data. If this was a mistake or you wish to rejoin, feel free to contact us.\n\nBest regards,\nRecruitway`,
            html: `
                    <p>Dear ${user.name},</p>
                    <p>We are sorry to see you go. Your account has been successfully deleted along with all associated data.</p>
                    <p>If this was a mistake or you wish to rejoin, feel free to contact us at
                    <a href="mailto:contact@recruitway.ai">contact@recruitway.ai</a>.</p>
                    <p>Best regards,</p>
                    <p>Recruitway</p>
                `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Respond with success message
        res.status(200).json({ message: 'Your account has been successfully deleted.' });
    } catch (err) {
        // console.error(err);
        res.status(500).json({ message: err.message });
    }

}


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