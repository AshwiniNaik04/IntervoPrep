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
                        Prepare smarter with AI-powered mock interviews, personalized resume-based
                        questions, instant feedback, and role-specific interview practice—all in one place.
                    </p>

                    <div className="hero-buttons">

                        <button
                            className="primary-btn"
                            onClick={() => navigate("/signup")}
                        >
                            Get Started
                        </button>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default LandingPage;