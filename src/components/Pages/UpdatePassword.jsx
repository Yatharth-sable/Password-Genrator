import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaArrowLeft } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { resetPassword } from "../../services/auth";

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Read changeDone from localStorage, default to false
  const [changeDone, setChangeDone] = useState(
    () => localStorage.getItem("changeDone") === "true"
  );

  const { password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);

    try {
      await dispatch(resetPassword(password, confirmPassword, token));
      setChangeDone(true);
      localStorage.setItem("changeDone", "true"); // persist flag
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  // Reset changeDone if user opens a new token link
  useEffect(() => {
    const token = location.pathname.split("/").at(-1);
    if (token) {
      const storedFlag = localStorage.getItem("changeDone");
      if (!storedFlag) {
        setChangeDone(false);
      }
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0f0f0f] px-4">
      {loading ? (
        <div className="text-white text-lg font-semibold">
          Updating your password...
        </div>
      ) : (
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/10">
          {/* Success View */}
          {changeDone ? (
            <div className="text-center">
              <h1 className="text-3xl font-bold text-orange-500 mb-4">
                Password Changed Successfully!
              </h1>
              <p className="text-gray-300 mb-6">
                You can now log in with your new password.
              </p>
              <Link
                to="/login"
                className="inline-block bg-[#e25514] hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md"
              >
                Go to Login
              </Link>
            </div>
          ) : (
            <>
              {/* Password Reset Form */}
              <h1 className="text-3xl font-bold text-white mb-3 text-center">
                Choose New Password
              </h1>
              <p className="text-sm text-gray-300 text-center mb-6">
                Almost done! Enter your new password to complete the process.
              </p>

              <form onSubmit={submitHandler} className="flex flex-col gap-5">
                {/* New Password */}
                <div>
                  <label className="block text-sm text-white mb-2 font-medium">
                    New Password <sup className="text-orange-500">*</sup>
                  </label>
                  <div className="relative">
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={handleOnChange}
                      placeholder="Enter new password"
                      className="w-full bg-transparent border border-gray-500 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition"
                    />
                    <span
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-300 hover:text-orange-400 transition"
                    >
                      {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                    </span>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm text-white mb-2 font-medium">
                    Confirm Password <sup className="text-orange-500">*</sup>
                  </label>
                  <div className="relative">
                    <input
                      required
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleOnChange}
                      placeholder="Confirm new password"
                      className="w-full bg-transparent border border-gray-500 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition"
                    />
                    <span
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-300 hover:text-orange-400 transition"
                    >
                      {showConfirmPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-[#e25514] text-white py-3 rounded-xl font-semibold text-lg hover:bg-orange-800 hover:scale-105 transition-all duration-300 shadow-md"
                >
                  Reset Password
                </button>
              </form>

              {/* Back to Login */}
              <div className="flex justify-center mt-6">
                <Link
                  to="/login"
                  className="flex flex-row items-center gap-2 text-gray-300 hover:text-orange-400 transition"
                >
                  <FaArrowLeft />
                  <p>Back to Login</p>
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
