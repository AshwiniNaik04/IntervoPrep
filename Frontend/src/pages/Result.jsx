import "./Result.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
    FaCheckCircle,
    FaExclamationCircle,
} from "react-icons/fa";

function Result() {
    const location = useLocation();
    const navigate = useNavigate();

    const result = location.state;

    if (!result) {
        return (
            <div className="result-container">
                <h2>No Result Found</h2>
            </div>
        );
    }

    return (
        <div className="result-container">
            <div className="result-card">
                <h1>Interview Results</h1>
                <p>Your AI interview has been completed successfully.</p>

                <div className="score-circle">
                    <h2>{result.overallScore}%</h2>
                    <span>Overall Score</span>
                </div>

                <div className="score-grid">
                    <div className="score-box">
                        <h3>Technical</h3>
                        <p>{result.technicalKnowledge}%</p>
                    </div>

                    <div className="score-box">
                        <h3>Communication</h3>
                        <p>{result.communication}%</p>
                    </div>

                    <div className="score-box">
                        <h3>Confidence</h3>
                        <p>{result.confidence}%</p>
                    </div>
                </div>

                <div className="feedback-section">
                    <h2>Strengths</h2>

                    <ul>
                        {result.strengths.map((item, index) => (
                            <li key={index}>
                                <FaCheckCircle className="strength-icon" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="feedback-section">
                    <h2>Areas to Improve</h2>

                    <ul>
                        {result.improvements.map((item, index) => (
                            <li key={index}>
                                <FaExclamationCircle className="improvement-icon" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="feedback-section">
                    <h2>AI Feedback</h2>

                    <p>{result.finalFeedback}</p>
                </div>

                <div className="result-buttons">
                    <button onClick={() => navigate("/setup")}>
                        Take Another Interview
                    </button>

                    <button onClick={() => navigate("/dashboard")}>
                        Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Result;