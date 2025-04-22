const { Schema, model } = require("mongoose");

const experienceSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: String,
        required: true,
        trim: true
    },
    endDate: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
}, { _id: false });

const educationSchema = new Schema({
    degree: {
        type: String,
        required: true,
        trim: true
    },
    institution: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: String,
        required: true,
        trim: true
    }
}, { _id: false });

const skillSchema = new Schema({
    skills: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, { _id: false });

const certificationSchema = new Schema({
    certificates: {
        type: String,
        required: true,
        trim: true
    },
    issuer: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: String,
        required: true,
        trim: true
    }
}, { _id: false });

const languageSchema = new Schema({
    languages: {
        type: String,
        required: true,
        trim: true
    }
}, { _id: false });

const socialMediaSchema = new Schema({
    linkedin: {
        type: String,
        trim: true
    },
    twitter: {
        type: String,
        trim: true
    },
    facebook: {
        type: String,
        trim: true
    }
}, { _id: false });

// ---------------- Profile Schemas ---------------- //

const interviewerProfileSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Auth",
        required: true
    },
    profilePicture: {
        type: String,
        trim: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    headline: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    summary: {
        type: String,
        required: true,
        trim: true
    },
    specialties: [{
        type: String,
        trim: true
    }],
    availability: [{
        day: {
            type: String
        },
        from: {
            type: String
        },
        to: {
            type: String
        }
    }],
    experience: [experienceSchema],
    education: [educationSchema],
    skills: [skillSchema],
    certifications: [certificationSchema],
    languages: [languageSchema],
    socialMedia: socialMediaSchema,
    // rating: {
    //     type: Number,
    //     default: 0
    // },
    // reviews: [{
    //     userId: {
    //         type: Schema.Types.ObjectId,
    //         ref: "Auth"
    //     },
    //     comment: {
    //         type: String,
    //         trim: true
    //     },
    //     rating: {
    //         type: Number,
    //         default: 0
    //     },
    // }]

}, { timestamps: true });

const InterviewerProfile = model("InterviewerProfile", interviewerProfileSchema)

module.exports = InterviewerProfile