
import "./Dashboard.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import DashboardCard from "../components/DashboardCard/DashboardCard";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [resumeUploaded, setResumeUploaded] = useState(false);

  useEffect(() => {
    const checkResume = async () => {
      try {
        const token = localStorage.getItem("token");

        await axios.get(
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

          {/* Hero section */}

          <section className="dashboard-hero">
            <div className="hero-content">
              <span className="hero-tag">
                YOUR PREPARATION SPACE
              </span>

              <h1>
                Welcome back, {user?.name?.trim().split(/\s+/)[0] || "there"} 👋
              </h1>

              <p>
                Ready to ace your next interview?
                Practice with AI-powered interviews, prepare using
                your resume, and build confidence for your dream job.
              </p>
            </div>

            <div className="hero-decoration">
              <div className="hero-circle hero-circle-one"></div>
              <div className="hero-circle hero-circle-two"></div>

              <div className="hero-floating-card">
                <span className="floating-icon">✦</span>
                <div>
                  <strong>Practice. Improve.</strong>
                  <small>Be interview ready.</small>
                </div>
              </div>
            </div>
          </section>


          {/* Main features */}
          <section className="dashboard-features">


            <div className="dashboard-grid">

              <div className="dashboard-action">
                <div className="action-icon interview-icon">
                  ✦
                </div>

                <span className="action-label">
                  PRACTICE
                </span>

                <DashboardCard
                  title="AI Interview"
                  description="Practice role-based interviews with AI and improve your interview skills."
                  buttonText="Start Interview"
                  onClick={() => navigate("/interview-setup")}
                />
              </div>

              <div className="dashboard-action">
                <div className="action-icon resume-icon">
                  ▤
                </div>

                <span className="action-label">
                  RESUME
                </span>

                {resumeUploaded ? (
                  <DashboardCard
                    title="Resume Uploaded"
                    description="Your resume is ready. Generate personalized interview questions based on your experience."
                    buttonText="Generate Resume Interview"
                    onClick={() => navigate("/resume-ready")}
                  />
                ) : (
                  <DashboardCard
                    title="Resume"
                    description="Upload and analyze your resume to prepare for questions related to your skills and projects."
                    buttonText="Upload Resume"
                    onClick={() => navigate("/resume")}
                  />
                )}
              </div>

              <div className="dashboard-action">
                <div className="action-icon history-icon">
                  ↗
                </div>

                <span className="action-label">
                  YOUR ACTIVITY
                </span>

                <DashboardCard
                  title="Interview History"
                  description="Revisit your previous interviews and review your preparation journey."
                  buttonText="View History"
                  onClick={() => navigate("/history")}
                />
              </div>

            </div>
          </section>

        </div>
      </main>
    </>
  );
}

export default Dashboard;
