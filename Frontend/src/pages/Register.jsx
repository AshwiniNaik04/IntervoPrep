import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../services/authService";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import "./Register.css";

function Register() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const data = await registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            toast.success(data.message);

            navigate("/login");

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Registration failed"
            );
        }
    };

    return (
        <AuthLayout
            title="Create Account"
            subtitle="Start preparing smarter with IntervoPrep"
        >
            <form onSubmit={handleSubmit}>
                <Input
                    label="Full Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                />

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

                <Input
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                />

                <Button
                    text="Create Account"
                    type="submit"
                />
            </form>

            <p className="register-footer">
                Already have an account?{" "}
                <Link to="/login">
                    Login
                </Link>
            </p>
        </AuthLayout>
    );
}

export default Register;