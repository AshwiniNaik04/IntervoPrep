const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    interviewType: {
        type: String,
        enum: ["Role", "Resume"],
        required: true,
    },

    role: {
        type: String,
        default: "",
    },

    questions: [
        {
            question: String,
        },
    ],

    answers: {
        type: Object,
        default: {},
    },

    overallScore: Number,

    technicalKnowledge: Number,

    communication: Number,

    confidence: Number,

    strengths: [String],

    improvements: [String],

    finalFeedback: String,
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("Interview", interviewSchema);