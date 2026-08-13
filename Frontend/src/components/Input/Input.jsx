import "./Input.css";

import { Eye, EyeOff } from "lucide-react";

function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  minLength,
  showPassword,
  setShowPassword
}) {
  const isPassword = setShowPassword !== undefined;

  return (
    <div className="input-group">
      <label>{label}</label>

      <div className="input-wrapper">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
        />

        {isPassword && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default Input;