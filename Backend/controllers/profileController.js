const Interview = require("../models/Interview");
const Resume = require("../models/Resume");

const getProfile = async (req, res) => {
    try {

        const interviews = await Interview.find({
            user: req.user.id,
        });

        const resume = await Resume.findOne({
            user: req.user.id,
        });

        const totalInterviews = interviews.length;

        const bestScore =
            totalInterviews > 0
                ? Math.max(...interviews.map(i => i.overallScore))
                : 0;

        const averageScore =
            totalInterviews > 0
                ? Math.round(
                    interviews.reduce(
                        (sum, item) => sum + item.overallScore,
                        0
                    ) / totalInterviews
                )
                : 0;

        res.status(200).json({
            success: true,
            profile: {
                name: req.user.name,
                email: req.user.email,
                totalInterviews,
                averageScore,
                bestScore,
                resumeUploaded: !!resume,
            },
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch profile.",
        });

    }
};

module.exports = {
    getProfile,
};