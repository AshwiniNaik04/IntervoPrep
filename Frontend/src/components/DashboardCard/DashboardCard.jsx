import "./DashboardCard.css";

function DashboardCard({
  title,
  description,
  buttonText,
  onClick,
}) {
  return (
    <div className="dashboard-card">
      <h3>{title}</h3>

      <p>{description}</p>

      <button onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
}

export default DashboardCard;