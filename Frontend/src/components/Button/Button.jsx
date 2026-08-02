import "./Button.css";

function Button({
  text,
  type = "button",
  onClick,
  disabled = false,
  className = "",
}) {
  return (
    <button
      className={`custom-btn ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;