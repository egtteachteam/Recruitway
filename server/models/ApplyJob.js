const { Schema, model } = require("mongoose");

const applyJobSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Auth",
        required: true
    },
    items: [
        {
            jobId: {
                type: Schema.Types.ObjectId,
                ref: "Job",
                required: true
            },
            status: {
                type: String,
                enum: ["Applied", "Reviewed", "Rejected", "Shortlisted"],
                required: true
            }
        }
    ]
}, { timestamps: true });

const ApplyJob = model("ApplyJob", applyJobSchema);

module.exports = ApplyJob;


