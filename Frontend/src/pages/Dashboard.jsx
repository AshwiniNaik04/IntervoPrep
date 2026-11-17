
import "./Dashboard.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import DashboardCard from "../components/DashboardCard/DashboardCard";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    const [resumeUploaded, setResumeUploaded] = useState(false);

    const user = (() => {
        try {
            return JSON.parse(localStorage.getItem("user") || "null");
        } catch {
            return null;
        }
    })();

    const firstName = user?.name?.trim().split(/\s+/)[0] || "there";

    useEffect(() => {
        const checkResume = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "http://localhost:5000/api/resume",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setResumeUploaded(true);
            } catch (error) {
                setResumeUploaded(false);
            }
        };

        checkResume();
    }, []);

    return (
        <>
            <Navbar />

            <main className="dashboard">
                <div className="dashboard-content">

                    {/* Welcome Section */}

                    <section className="dashboard-hero">

                        <div className="hero-content">

                            <span className="hero-tag">
                                <span className="hero-tag-dot"></span>
                                YOUR PERSONAL PREPARATION SPACE
                            </span>

                            <h1>
                                Welcome back, {firstName}!
                                <span className="welcome-wave"> 👋</span>
                            </h1>

                            <p>
                                Your next opportunity starts with preparation.
                                Practice with AI, strengthen your resume,
                                and build confidence for every interview.
                            </p>

                        </div>

                        <div className="hero-decoration">
                            <div className="hero-circle hero-circle-one"></div>
                            <div className="hero-circle hero-circle-two"></div>
                            <div className="hero-circle hero-circle-three"></div>

                            <div className="hero-floating-card">
                                <span className="floating-icon">✦</span>

                                <div>
                                    <strong>Practice. Improve. Succeed.</strong>
                                    <small>Your interview journey starts here.</small>
                                </div>
                            </div>
                        </div>

                    </section>


                    {/* Preparation Workspace */}

                    <section className="dashboard-features">

                        <div className="section-heading">
                            <div>
                                <span className="section-eyebrow">
                                    GET STARTED
                                </span>

                                <h2>Your Preparation Workspace</h2>

                                <p>
                                    Everything you need to prepare for your next interview.
                                </p>
                            </div>
                        </div>


                        <div className="dashboard-grid">

                            {/* AI Interview */}

                            <div className="dashboard-action">

                                <div className="action-top">
                                    <div className="action-icon interview-icon">
                                        ✦
                                    </div>

                                    <span className="action-label interview-label">
                                        PRACTICE
                                    </span>
                                </div>

                                <DashboardCard
                                    title="AI Interview"
                                    description="Practice role-based technical interviews with AI-generated questions and personalized feedback."
                                    buttonText="Start Interview"
                                    onClick={() => navigate("/interview-setup")}
                                />

                            </div>


                            {/* Resume */}

                            <div className="dashboard-action">

                                <div className="action-top">
                                    <div className="action-icon resume-icon">
                                        ▤
                                    </div>

                                    <span className="action-label resume-label">
                                        RESUME
                                    </span>
                                </div>

                                <DashboardCard
                                    title={resumeUploaded ? "Resume Ready" : "Resume Analyzer"}
                                    description={
                                        resumeUploaded
                                            ? "Your resume is uploaded. Generate personalized interview questions based on your experience."
                                            : "Upload and analyze your resume to prepare for questions about your skills and projects."
                                    }
                                    buttonText={
                                        resumeUploaded
                                            ? "Generate Interview"
                                            : "Upload Resume"
                                    }
                                    onClick={() =>
                                        navigate(
                                            resumeUploaded
                                                ? "/resume-ready"
                                                : "/resume"
                                        )
                                    }
                                />

                            </div>


                            {/* Interview History */}

                            <div className="dashboard-action">

                                <div className="action-top">
                                    <div className="action-icon history-icon">
                                        ↗
                                    </div>

                                    <span className="action-label history-label">
                                        PROGRESS
                                    </span>
                                </div>

                                <DashboardCard
                                    title="Interview History"
                                    description="Explore your previous interview sessions, revisit feedback, and track your preparation journey."
                                    buttonText="View History"
                                    onClick={() => navigate("/history")}
                                />

                            </div>

                        </div>

                    </section>


                    {/* Preparation Tip */}

                    <section className="dashboard-tip">

                        <div className="tip-icon">
                            ✨
                        </div>

                        <div className="tip-content">
                            <h3>Small steps lead to big improvements.</h3>

                            <p>
                                Make interview preparation a habit.
                                Practice regularly, review your feedback,
                                and keep improving one interview at a time.
                            </p>
                        </div>

                        <button
                            className="tip-button"
                            onClick={() => navigate("/interview-setup")}
                        >
                            Start Practicing <span>→</span>
                        </button>

                    </section>

                </div>
            </main>
        </>
    );
}

export default Dashboard;
