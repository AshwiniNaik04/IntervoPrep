
import "./AuthLayout.css";

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="auth-container">
      <div className="auth-visual">
        <div className="auth-visual-content">
          <h1>IntervoPrep</h1>
          <h2>Prepare smarter. Interview better.</h2>
          <p>
            Build confidence, practice interviews, and take
            the next step toward your dream career.
          </p>
        </div>
      </div>

      <div className="auth-form-section">
        <div className="auth-card">
          <h1 className="auth-logo">IntervoPrep</h1>
          <h2>{title}</h2>
          <p className="auth-subtitle">{subtitle}</p>

          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
