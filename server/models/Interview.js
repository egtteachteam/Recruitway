// const mongoose = require('mongoose');

// const InterviewSchema = new mongoose.Schema({
//     interviewee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     interviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     company: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     scheduledTime: Date,
//     status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' }
// });

// module.exports = mongoose.model('Interview', InterviewSchema);



const { Schema, model } = require('mongoose');

const interviewSchema = new Schema({
    candidate: {
        name: String,
        email: String,
        phone: String,
        resumeUrl: String,
        imageUrl: String,
    },
    position: {
        title: String,
        department: String,
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending',
    },
    messages: [
        {
            role: String,
            content: String,
            isCode: Boolean,
        }
    ]
}, { timestamps: true });

const Interview = model('Interview', interviewSchema);

module.exports = Interview



