import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="landing">

            {/* Navbar */}

            <nav className="landing-nav">

                <h2 className="logo">
                    IntervoPrep
                </h2>

                <div className="nav-buttons">

                    <button
                        className="login-btn"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>

                    <button
                        className="signup-btn"
                        onClick={() => navigate("/signup")}
                    >
                        Sign Up
                    </button>

                </div>

            </nav>

            {/* Hero */}

            <section className="hero">

                <div className="hero-left">

                    <span className="tag">
                        AI Powered Interview Preparation
                    </span>

                    <h1>
                        Crack Your Next
                        <br />
                        Tech Interview
                        <span> with AI</span>
                    </h1>

                    <p>
                        Practice personalized mock interviews, receive instant AI
                        feedback, upload your resume, and prepare with confidence.
                    </p>

                    <div className="hero-buttons">

                        <button
                            className="primary-btn"
                            onClick={() => navigate("/signup")}
                        >
                            Get Started
                        </button>

                        <button
                            className="secondary-btn"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>

                    </div>

                </div>

                <div className="hero-right">

                    <div className="preview-card">

                        <h3>AI Interview Score</h3>

                        <div className="score">
                            92%
                        </div>

                        <div className="progress">
                            <div className="fill"></div>
                        </div>

                        <div className="preview-stats">

                            <div>
                                <h4>15</h4>
                                <span>Questions</span>
                            </div>

                            <div>
                                <h4>4</h4>
                                <span>Interviews</span>
                            </div>

                            <div>
                                <h4>AI</h4>
                                <span>Feedback</span>
                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default LandingPage;