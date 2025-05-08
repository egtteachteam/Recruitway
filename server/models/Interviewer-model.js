const { Schema, model } = require('mongoose');

const interviewerSchema = new Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
            match: [/\S+@\S+\.\S+/, 'Invalid email format']
        },
        position: {
            type: String,
            trim: true
        },
        calendar: [
            {
                interviewId: {
                    type: Schema.Types.ObjectId,
                    ref: "Interview"
                },
                start: Date,
                end: Date,
                status: {
                    type: String,
                    enum: ["scheduled", "completed", "cancelled"],
                    default: "scheduled"
                }
            }
        ],
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const Interviewer = model("Interviewer", interviewerSchema);
module.exports = Interviewer
