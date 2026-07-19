import "./AuthLayout.css";

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-logo">IntervoPrep</h1>

        <h2>{title}</h2>

        <p>{subtitle}</p>

        {children}
      </div>
    </div>
  );
}

export default AuthLayout;