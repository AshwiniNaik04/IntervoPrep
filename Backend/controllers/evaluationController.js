const Interview = require("../models/Interview");
const { evaluateInterview } = require("../services/evaluateService");

const evaluate = async (req, res) => {
  try {
    const {
      questions,
      answers,
      interviewType,
      role,
    } = req.body;
    const result = await evaluateInterview({
      questions,
      answers,
    });

    await Interview.create({
      user: req.user.id,
      interviewType,
      role,
      questions,
      answers,
      overallScore: result.overallScore,
      technicalKnowledge: result.technicalKnowledge,
      communication: result.communication,
      confidence: result.confidence,
      strengths: result.strengths,
      improvements: result.improvements,
      finalFeedback: result.finalFeedback,
    });

    res.json(result);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Evaluation failed",
    });
  }
};

module.exports = {
  evaluate,
};