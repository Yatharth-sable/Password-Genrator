import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPasswordResetToken } from "../../services/auth";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const ResetPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0f0f0f] px-4">
      {loading ? (
        <div className="text-white text-lg font-semibold">Loading...</div>
      ) : (
        <div className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h1 className="text-3xl font-bold text-white mb-3 text-center">
            {!emailSent ? "Reset Your Password" : "Check Your Email"}
          </h1>

          <p className="text-gray-300 text-sm text-center mb-6">
            {!emailSent
              ? "No worries — we’ll send you instructions to reset your password. If you don’t have access to your email, try account recovery."
              : `We’ve sent a reset link to your email: `}
            {emailSent && <span className="text-orange-400 font-medium">{email}</span>}
          </p>

          <form onSubmit={submitHandler} className="flex flex-col gap-5">
            {!emailSent && (
              <div>
                <label className="block text-sm text-white mb-2 font-medium">
                  Email Address <sup className="text-orange-500">*</sup>
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-transparent border border-gray-500 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition"
                />
              </div>
            )}

            <button
              type="submit"
              className="bg-[#e25514] hover:bg-orange-600 transition-all duration-300 text-white py-3 rounded-xl font-semibold text-lg shadow-md"
            >
              {!emailSent ? "Send Reset Link" : "Resend Email"}
            </button>
          </form>

          <div className="flex justify-center mt-6">
            <Link
              to="/login"
              className="flex items-center gap-2 text-gray-300 hover:text-orange-400 transition"
            >
              <FaArrowLeft />
              <span>Back to Login</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
