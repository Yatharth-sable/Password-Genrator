import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OTPInput from "react-otp-input";
import { useNavigate, Link } from "react-router-dom";
import { sendOtp, signUp } from "../../services/auth";
import { FaArrowLeft, FaRedoAlt } from "react-icons/fa";
import cute from "../../Assets/cute.svg"; // 🧡 replace with your mascot image path

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const { loading, signupData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!signupData) {
      console.log("Signup data not found");
      navigate("/signup");
    }
  }, [signupData, navigate]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!signupData) return;

    const { firstName, lastName, email, password, confirmPassword } = signupData;
    dispatch(signUp(firstName, lastName, email, password, confirmPassword, otp, navigate));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcd0b1] relative overflow-hidden">
      {/* Background Image (blurred, mirrored) */}
      <img
        src={cute}
        alt=""
        className="absolute left-0 w-[40%] opacity-30 scale-x-[-1] blur-sm"
      />

      {/* Glass container */}
      <div className="absolute w-[80%] h-[70%] bg-[#FEDCC5]/80 backdrop-blur-xl border border-white/40 rounded-2xl shadow-xl flex items-center justify-between px-10 max-[900px]:flex-col max-[900px]:h-auto max-[900px]:p-6">
        {/* Left Panel (Verify Email Card) */}
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-8 w-[360px] shadow-md">
          <h1 className="text-[#fc6a03] font-medium text-sm mb-1">Your logo</h1>
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Verify Email</h2>
          <p className="text-gray-600 text-sm mb-6">
            A verification code has been sent to your email.
            <br />
            Please enter it below to confirm your account.
          </p>

          {loading ? (
            <div className="text-center text-lg text-gray-700">Loading...</div>
          ) : (
            <form onSubmit={handleOnSubmit} className="flex flex-col items-center">
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span className="px-1 text-gray-500">-</span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    className="w-10 h-12 sm:w-12 sm:h-14 mx-1 border border-gray-300 rounded-md bg-white/70 text-gray-800 text-lg text-center focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
                  />
                )}
              />

              <button
                type="submit"
                className="bg-[#fc6a03] text-white font-semibold px-4 py-2 w-full rounded-md hover:bg-orange-600 transition duration-200 mt-6"
              >
                Verify Email
              </button>
            </form>
          )}

          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-3 text-sm">
            <Link
              to="/login"
              className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition"
            >
              <FaArrowLeft />
              <span>Back to login</span>
            </Link>

            <button
              onClick={() => dispatch(sendOtp(signupData?.email, navigate))}
              className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition"
            >
              <FaRedoAlt />
              <span>Resend Code</span>
            </button>
          </div>
        </div>

        {/* Mascot / Right Side */}
        <img
          src={cute}
          alt="cute mascot"
          className="w-[320px] object-contain opacity-90 max-[900px]:mt-6"
        />
      </div>
    </div>
  );
};

export default VerifyEmail;
