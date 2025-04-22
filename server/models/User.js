const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
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
    // profile: {
    //     company: {
    //         fullname: {
    //             type: String,
    //             required: [true, 'Full name is required'],
    //             trim: true
    //         },
    //     },
    //     candidate: {
    //         fullname: {
    //             type: String,
    //             required: [true, 'Full name is required'],
    //             trim: true
    //         },
    //     },
    //     interviewer: {
    //         fullname: {
    //             type: String,
    //             required: [true, 'Full name is required'],
    //             trim: true
    //         },
    //     },
    //     interviewee: {
    //         fullname: {
    //             type: String,
    //             required: [true, 'Full name is required'],
    //             trim: true
    //         },
    //     },
    //     superAdmin: {
    //         fullname: {
    //             type: String,
    //             required: [true, 'Full name is required'],
    //             trim: true
    //         },
    //     },
    // }
}, { timestamps: true });

UserSchema.methods.generateToken = function () {
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

const User = model('User', UserSchema);

module.exports = User















// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: {
//     type: String,
//     required: true,
//     enum: ['user', 'company', 'interviewer', 'interviewee', 'superadmin']
//   },
//   isProfileComplete: { type: Boolean, default: false },
//   profile: {
//     // Common fields
//     name: String,
//     avatar: String,

//     // Role-specific fields
//     companyInfo: {
//       companyName: String,
//       industry: String,
//       website: String,
//       // ... other company fields
//     },
//     professionalInfo: {
//       skills: [String],
//       experience: Number,
//       // ... other professional fields
//     },
//     // ... other role-specific fields
//   },
//   createdAt: { type: Date, default: Date.now }
// });

// // Password hashing middleware
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// module.exports = mongoose.model('User', userSchema);







// const mongoose = require('mongoose');
// const jwt = require("jsonwebtoken");

// const experienceSchema = new mongoose.Schema({
//     title: String,
//     company: String,
//     location: String,
//     startDate: String,
//     endDate: String,
//     description: String
// }, { _id: false });

// const educationSchema = new mongoose.Schema({
//     degree: String,
//     institution: String,
//     year: String
// }, { _id: false });

// const skillSchema = new mongoose.Schema({
//     name: String,
//     level: String
// }, { _id: false });

// const certificationSchema = new mongoose.Schema({
//     name: String,
//     issuer: String,
//     year: String
// }, { _id: false });

// const languageSchema = new mongoose.Schema({
//     name: String,
//     proficiency: String
// }, { _id: false });

// const projectSchema = new mongoose.Schema({
//     name: String,
//     description: String,
//     year: String
// }, { _id: false });

// const companySchema = new mongoose.Schema({
//     logo: String,
//     tagline: String,
//     industry: String,
//     companySize: String,
//     headquarters: String,
//     keyDetails: [String],
//     ceo: {
//         name: String,
//         since: String
//     },
//     founder: {
//         name: String,
//         currentRole: String
//     },
//     website: String,
//     contactEmail: String,
//     contactPhone: String,
//     about: String,
//     history: mongoose.Schema.Types.Mixed,
//     des: mongoose.Schema.Types.Mixed,
//     departments: [String],
//     locations: [String],
//     socialMedia: {
//         linkedin: String,
//         twitter: String,
//         facebook: String
//     }
// }, { _id: false });

// const userProfileSchema = new mongoose.Schema({
//     avatar: String,
//     headline: String,
//     location: String,
//     email: String,
//     phone: String,
//     summary: String,
//     experience: [experienceSchema],
//     education: [educationSchema],
//     skills: [skillSchema],
//     certifications: [certificationSchema],
//     languages: [languageSchema],
//     projects: [projectSchema]
// }, { _id: false });

// const interviewerProfileSchema = new mongoose.Schema({
//     avatar: String,
//     expertise: [String],
//     experienceYears: Number,
//     availableSlots: [Date],
//     interviewLanguages: [String],
//     rating: Number,
//     bio: String
// }, { _id: false });

// const intervieweeProfileSchema = new mongoose.Schema({
//     avatar: String,
//     education: [educationSchema],
//     skills: [skillSchema],
//     resumeLink: String,
//     portfolioLink: String,
//     jobInterests: [String],
//     locationPreference: String
// }, { _id: false });

// const superadminProfileSchema = new mongoose.Schema({
//     avatar: String,
//     email: String,
//     phone: String,
//     permissions: [String]
// }, { _id: false });

// const userSchema = new mongoose.Schema({
//     fullname: {
//         type: String,
//         required: [true, 'Full name is required'],
//         trim: true
//     },
//     email: {
//         type: String,
//         required: [true, 'Email is required'],
//         unique: true,
//         trim: true,
//         lowercase: true
//     },
//     password: {
//         type: String,
//         required: [true, 'Password is required'],
//         minlength: [6, 'Password must be at least 6 characters long']
//     },
//     role: {
//         type: String,
//         enum: ['superadmin', 'company', 'interviewee', 'interviewer', 'user'],
//         default: 'user' // Default role is "user"
//     },
//     isVerified: {
//         type: Boolean,
//         default: false
//     },
//     isProfileComplete: { type: Boolean, default: false },
//     profile: {
//         type: mongoose.Schema.Types.Mixed,
//         default: {}
//     },
//     companyInfo: companySchema,
//     userInfo: userProfileSchema,
//     interviewerInfo: interviewerProfileSchema,
//     intervieweeInfo: intervieweeProfileSchema,
//     superadminInfo: superadminProfileSchema,

// }, { timestamps: true });

// userSchema.methods.generateToken = function () {
//     try {
//         const token = jwt.sign({
//             userId: this._id.toString(),
//             email: this.email,
//         }, process.env.JWT_SECRET, {
//             expiresIn: "1d",
//         });

//         return token;
//     } catch (error) {
//         throw new Error("Error generating token");
//     }
// };


// const User = mongoose.model('User', userSchema);

// module.exports = User

