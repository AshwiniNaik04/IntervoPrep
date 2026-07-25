import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import "./ResumeReady.css";
import {
    FaCheckCircle,
    FaCode,
    FaFolderOpen,
    FaUserTie,
    FaChartLine,
    FaClipboardList,
} from "react-icons/fa";

function ResumeReady() {
    const navigate = useNavigate();

    return (
        <div className="ready-container">

            <button
                className="back-btn"
                onClick={() => navigate("/dashboard")}
            >
                <IoArrowBack />
            </button>

            <div className="ready-card">

                <div className="ready-icon">
                </div>

                <h1>Personalized Interview Ready</h1>

                <p className="subtitle">
                    Your resume has been analyzed successfully.
                </p>

                <p className="description">
                    We'll generate an interview tailored to your:
                </p>
                <div className="features">
                    <p><FaCheckCircle className="feature-icon" /> Skills</p>
                    <p><FaCheckCircle className="feature-icon" /> Projects</p>
                    <p><FaCheckCircle className="feature-icon" /> Education</p>
                    <p><FaCheckCircle className="feature-icon" /> Experience</p>
                </div>

                <div className="includes">
                    <h3>You'll receive</h3>

                    <ul>
                        <li><FaClipboardList className="include-icon" /> 15 Personalized AI Questions</li>
                        <li><FaCode className="include-icon" /> Technical Questions</li>
                        <li><FaFolderOpen className="include-icon" /> Project Discussion</li>
                        <li><FaUserTie className="include-icon" /> HR & Behavioral Questions</li>
                        <li><FaChartLine className="include-icon" /> AI Performance Evaluation</li>
                    </ul>
                </div>

                <button
                    className="start-btn"
                    onClick={() => navigate("/resume-loading")}
                >
                    Start AI Interview
                </button>

                <button
                    className="replace-btn"
                    onClick={() => navigate("/resume")}
                >
                    Replace Resume
                </button>

            </div>
        </div >
    );
}

export default ResumeReady;