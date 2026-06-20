import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom"; // use Link instead of <a>
import axiosInstance from "../../api/axiosInstance";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const email = emailOrMobile.trim();
    const pass = password.trim();

    if (!email || !pass) {
      setErrorMsg("Both fields are required.");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post("/login", {
        email,
        password: pass,
      });

      const { token, user, message } = response.data;

      if (token) {
        login(token, user);        // set context + localStorage
        navigate("/");            // redirect
      } else {
        setErrorMsg(message || "Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "An error occurred during login."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Log In to Your Account
        </h2>

        {errorMsg && (
          <div className="mb-4 text-red-600 text-sm text-center font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email or Mobile
            </label>
            <input
              type="text"
              id="email"
              value={emailOrMobile}
              onChange={(e) => setEmailOrMobile(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email or mobile"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-blue-600" />
              Remember me
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md transition text-white ${
              loading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-5">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
