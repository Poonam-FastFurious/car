import React, { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }

    // Auto-redirect after 5 seconds if coming from OTP verification
    if (location.state?.from === "otp-verification") {
      const timer = setTimeout(() => {
        navigate("/", { replace: true });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate, location.state]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h1>
        <p className="text-gray-600 mb-6">
          {location.state?.message || "Your registration is complete!"}
        </p>

        {location.state?.from === "otp-verification" && (
          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-green-500 h-1.5 rounded-full animate-progress" 
                style={{ animationDuration: '5s' }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              You'll be redirected automatically...
            </p>
          </div>
        )}

        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ThankYou;