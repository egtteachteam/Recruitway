const { Schema, model } = require('mongoose');

const SkillSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    score: {
        type: String,
        required: true
    },
    percentage: {
        type: String,
        required: true
    },
}, { _id: false });

const CodeEvaluationSchema = new Schema({
    type: {
        type: String,
        enum: ['positive', 'negative'],
        required: true,
    },
    points: [{
        type: String,
        required: true
    }],
}, { _id: false });

const CodeTaskSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    evaluation: [CodeEvaluationSchema],
}, { _id: false });

const ReportSchema = new Schema({
    interviewId: {
        type: Schema.Types.ObjectId,
        ref: "Interview"
    },
    candidateName: {
        type: String,
        required: true
    },
    candidateEmail: {
        type: String,
        required: true
    },
    positionTitle: {
        type: String,
        required: true
    },
    interviewDate: {
        type: Date,
        required: true
    },
    overallScore: {
        type: String,
        required: true
    },
    questionsAnswered: {
        type: String,
        required: true
    },
    totalQuestions: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    skills: [SkillSchema],
    codeTasks: [CodeTaskSchema],
    interviewerSummary: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Report = model('Report', ReportSchema);

module.exports = Report
