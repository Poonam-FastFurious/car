import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { AuthContext } from "../../context/AuthContext";

const OtpVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const { email } = location.state || {};
  const [otp, setOtp] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!email) navigate("/signup");
  }, [email, navigate]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setVerifying(true);

    try {
      const res = await axiosInstance.post("/verify-otp", {
        email,
        otp: otp.trim(),
      });

      if (res.data?.status || res.data?.message?.toLowerCase().includes("success")) {
        // If you expect a token later, you can keep this but make it optional
        if (res.data?.token) {
          login(res.data.token, res.data.user);
        }

        navigate("/thank-you", {
          state: {
            from: "otp-verification",
            message: res.data.message || "Email verified successfully!"
          },
          replace: true
        });
      } else {
        setErrorMsg(res.data.message || "OTP verification failed.");
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        Object.values(err.response?.data?.errors || {}).join("\n") ||
        "Server error. Try again.";
      setErrorMsg(msg);
    } finally {
      setVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    setErrorMsg("");
    setResending(true);
    try {
      const res = await axiosInstance.post("/resend-otp", { email });

      if (res.data?.status || res.data?.message?.toLowerCase().includes("otp")) {
        setResendCooldown(60);
        alert("OTP resent successfully.");
      } else {
        setErrorMsg(res.data.message || "Failed to resend OTP.");
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        Object.values(err.response?.data?.errors || {}).join("\n") ||
        "Failed to resend OTP.";
      setErrorMsg(msg);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md p-6 rounded-md w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Email Verification</h2>
        <p className="text-sm text-center mb-2 text-gray-600">
          Verification code sent to <span className="font-medium">{email}</span>
        </p>

        {errorMsg && (
          <div className="mb-4 text-sm text-red-600 text-center">{errorMsg}</div>
        )}

        <form onSubmit={handleOtpSubmit} className="space-y-4">
          <input
            type="text"
            name="otp"
            placeholder="Enter 6-digit verification code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            maxLength={6}
            className="w-full border px-4 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={verifying}
            className={`w-full py-2 rounded text-white text-sm font-medium transition ${verifying ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {verifying ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <div className="text-sm text-center mt-4">
          Didn't receive code?{" "}
          <button
            disabled={resendCooldown > 0 || resending}
            onClick={handleResendOtp}
            className={`text-blue-600 font-medium hover:underline ${resendCooldown > 0 || resending ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {resendCooldown > 0 ? `Resend (${resendCooldown}s)` : "Resend"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;