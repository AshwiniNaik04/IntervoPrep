import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";

import AuthLayout from "../components/AuthLayout/AuthLayout";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";

import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);

      localStorage.setItem("token", data.token);

      alert(data.message);

      navigate("/dashboard");

    } catch (error) {
      alert(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to continue your interview preparation"
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />

        <Button
          text="Login"
          type="submit"
        />
      </form>

      <p className="login-footer">
        Don't have an account?{" "}
        <Link to="/register">
          Register
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Login;