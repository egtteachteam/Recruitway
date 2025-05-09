// const { Schema, model } = require('mongoose');

// const InterviewSchema = new Schema({
//     candidateId: {
//         type: Schema.Types.ObjectId,
//         ref: 'Auth',
//         required: true
//     },
//     candidateName: {
//         type: String,
//         required: true
//     },
//     jobId: {
//         type: Schema.Types.ObjectId,
//         ref: 'Job',
//         required: true
//     },
//     jobTitle: {
//         type: String,
//         required: true
//     },
//     companyId: {
//         type: Schema.Types.ObjectId,
//         ref: 'Auth',
//         required: true
//     },
//     companyName: {
//         type: String,
//         required: true
//     },
//     // interviewerId: {
//     //     type: Schema.Types.ObjectId,
//     //     ref: 'Interviewer',
//     //     required: true
//     // },
//     interviewerName: {
//         type: String,
//         required: true
//     },
//     start: {
//         type: Date,
//         required: true
//     },
//     end: {
//         type: Date,
//         required: true
//     },
//     location: {
//         type: String,
//         required: true
//     },
//     notes: {
//         type: String
//     },
//     status: {
//         type: String,
//         enum: ['scheduled', 'confirmed', 'inprocess', 'completed', 'cancelled'],
//         default: 'scheduled'
//     }
// }, { timestamps: true }); 

// const Interview = model('Interview', InterviewSchema);
// module.exports = Interview







const { Schema, model } = require('mongoose');

const InterviewSchema = new Schema({
    candidateId: {
        type: Schema.Types.ObjectId,
        ref: 'Auth',
        required: true
    },
    candidateName: {
        type: String,
        required: true
    },
    jobId: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'Auth',
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    interviewerId: {
        type: Schema.Types.ObjectId,
        ref: 'Interviewer',
        required: true
    },
    interviewerName: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true,
        enum: ['googleMeet', 'zoom', 'inPerson', 'phone']
    },
    notes: {
        type: String
    },
    status: {
        type: String,
        enum: ['scheduled', 'confirmed', 'inProcess', 'completed', 'cancelled'],
        default: 'scheduled'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    deletedAt: {
        type: Date
    },
    isLinkSent: {
        type: Boolean,
        default: false
    },
    zoomJoinUrl: String,
    zoomStartUrl: String,
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes for faster querying
InterviewSchema.index({ candidateId: 1 });
InterviewSchema.index({ interviewerId: 1 });
InterviewSchema.index({ start: 1, end: 1 });
InterviewSchema.index({ status: 1 });

// Prevent duplicate interviews
InterviewSchema.index(
    { candidateId: 1, jobId: 1, start: 1 },
    { unique: true, partialFilterExpression: { isActive: true } }
);

const Interview = model('Interview', InterviewSchema);
module.exports = Interview