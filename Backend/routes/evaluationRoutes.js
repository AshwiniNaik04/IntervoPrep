const express = require("express");
const router = express.Router();

const {
  evaluate,
} = require("../controllers/evaluationController");

router.post("/", evaluate);

module.exports = router;