const { Schema, model } = require("mongoose")
const jwt = require("jsonwebtoken");

const authSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    role: {
        type: String,
        enum: ['superadmin', 'company', 'interviewee', 'interviewer', 'user'],
        default: 'user' // Default role is "user"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetToken: {
        type: String
    },
    tokenExpiry: {
        type: Date
    }
}, { timestamps: true });

authSchema.methods.generateToken = function () {
    try {
        const token = jwt.sign({
            userId: this._id.toString(),
            email: this.email,
        }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        return token;
    } catch (error) {
        throw new Error("Error generating token");
    }
};

const Auth = model('Auth', authSchema);

module.exports = Auth