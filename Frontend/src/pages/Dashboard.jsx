import "./Dashboard.css";

import Navbar from "../components/Navbar/Navbar";
import DashboardCard from "../components/DashboardCard/DashboardCard";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <h1>Welcome back, {user?.name} 👋</h1>

        <p className="dashboard-subtitle">
          Ready to ace your next interview?
        </p>

        <div className="dashboard-grid">
          <DashboardCard
            title="AI Interview"
            description="Practice interviews with AI."
            buttonText="Start Interview"
            onClick={() => navigate("/interview-setup")}
          />

          <DashboardCard
            title="Resume"
            description="Upload and analyze your resume."
            buttonText="Upload Resume"
            onClick={() => navigate("/resume")}
          />

          <DashboardCard
            title="Interview History"
            description="View your previous interviews."
            buttonText="View History"
            onClick={() => navigate("/history")}
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;