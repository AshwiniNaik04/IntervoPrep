const { evaluateInterview } = require("../services/evaluateService");

const evaluate = async (req, res) => {
  try {
    const { questions, answers } = req.body;

    const result = await evaluateInterview({
      questions,
      answers,
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