import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./History.css";

function History() {

  const navigate = useNavigate();

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchHistory = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/interview/history",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setInterviews(response.data.interviews);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

    fetchHistory();

  }, []);

  if (loading) {
    return (
      <div className="history-container">
        <h2>Loading interview history...</h2>
      </div>
    );
  }

  return (
    <div className="history-container">

      <h1>Interview History</h1>

      {interviews.length === 0 ? (

        <div className="empty-history">

          <h2>No Interviews Yet</h2>

          <p>
            Complete your first AI interview to see your history here.
          </p>

        </div>

      ) : (

        <div className="history-grid">

          {interviews.map((item) => (

            <div
              className="history-card"
              key={item._id}
            >

              <h2>{item.interviewType} Interview</h2>

              <p className="history-date">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>

              <div className="history-score">

                <span>Overall Score</span>

                <h3>{item.overallScore}%</h3>

              </div>

              <button
                className="view-btn"
                onClick={() =>
                  navigate("/result", {
                    state: item,
                  })
                }
              >
                View Result
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default History;