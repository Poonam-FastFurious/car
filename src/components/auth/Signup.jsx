import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
    password_confirmation: "",
    gender: "male",
    date_of_birth: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    agree: false,
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const trimmed = {
      ...formData,
      email: formData.email.trim(),
      mobile: formData.mobile.trim(),
      password: formData.password.trim(),
      password_confirmation: formData.password_confirmation.trim(),
    };

    if (!trimmed.agree) {
      setErrorMsg("Please accept the terms and conditions.");
      return;
    }

    if (trimmed.password !== trimmed.password_confirmation) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post("/register", trimmed);
      if (response.data?.message?.toLowerCase().includes("otp")) {
        navigate("/otp-verification", {
          state: {
            email: trimmed.email,
            mobile: trimmed.mobile, // Make sure to pass mobile too
          },
          replace: true // Add replace to prevent going back to signup
        });
      } else {
        setErrorMsg(response.data.message || "Signup failed.");
      }
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        Object.values(error.response?.data?.errors || {}).join("\n") ||
        "An error occurred during signup.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
        {errorMsg && (
          <div className="mb-4 text-sm text-red-600 font-medium text-center">{errorMsg}</div>
        )}

        <>
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Create Your Account</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} required className="border text-sm rounded-md px-3 py-2" />
              <input type="text" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} required className="border text-sm rounded-md px-3 py-2" />
            </div>

            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="border text-sm rounded-md px-3 py-2 w-full" />
            <input type="text" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} required className="border text-sm rounded-md px-3 py-2 w-full" />

            <div className="grid grid-cols-2 gap-3">
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="border text-sm rounded-md px-3 py-2" />
              <input type="password" name="password_confirmation" placeholder="Confirm Password" value={formData.password_confirmation} onChange={handleChange} required className="border text-sm rounded-md px-3 py-2" />
            </div>

            <select name="gender" value={formData.gender} onChange={handleChange} className="border text-sm rounded-md px-3 py-2 w-full">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} required className="border text-sm rounded-md px-3 py-2 w-full" />
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required className="border text-sm rounded-md px-3 py-2 w-full" />

            <div className="grid grid-cols-2 gap-3">
              <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required className="border text-sm rounded-md px-3 py-2" />
              <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required className="border text-sm rounded-md px-3 py-2" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required className="border text-sm rounded-md px-3 py-2" />
              <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required className="border text-sm rounded-md px-3 py-2" />
            </div>

            <label className="flex items-center text-sm">
              <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} className="mr-2 accent-red-600" />
              I agree to the <a href="#" className="text-blue-600 hover:underline ml-1">terms and conditions</a>
            </label>

            <button type="submit" className="w-full bg-red-600 text-white text-sm py-2 rounded-md hover:bg-red-700 transition" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        </>
      </div>
    </div>
  );
};

export default Signup;