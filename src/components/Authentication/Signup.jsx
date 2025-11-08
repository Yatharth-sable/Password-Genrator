import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router-dom";
import cute from "../../Assets/cute.svg";
import { sendOtp } from "../../services/auth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setSignupData } from "../../slice/authSlice";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { password, confirmPassword } = formData;

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }

     const signupData = {
      ...formData,
    }


    dispatch(setSignupData(signupData))
    dispatch(sendOtp(formData.email, navigate));

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const path = useParams();

  return (
    <div className="min-w-full min-h-screen bg-[#f4ebe1] relative flex items-center justify-center overflow-hidden">
      {/* Background flipped image */}
      <img
        src={cute}
        className="scale-x-[-1] absolute left-0 bottom-10 -ml-32 opacity-60 w-[600px] h-auto"
        // className="scale-x-[-1] -ml-12 mt-16  absolute opacity-70  "

        alt=""
      />

      {/* Main gradient container */}
      <div className="relative flex items-center justify-between h-[80%] w-[75%] opacity-90 rounded-3xl bg-gradient-to-r from-[#eacdb9] to-[#fae1ce] shadow-xl px-10 mt-16">
        {/* Sign Up Form */}
        <div className="bg-white rounded-2xl p-8 m-6 mx-8 shadow-lg  max-w-md my-10 ">
          <p className="text-[#F25019] mb-1 text-sm">Your logo</p>
          <p className="text-3xl font-bold mb-6">SignUp</p>

          <form onSubmit={submitHandler}>
            <div className="grid grid-cols-2 gap-6 mb-5">
              <div>
                <label
                  htmlFor="firstName"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={changeHandler}
                  placeholder="John"
                  className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-orange-400 outline-none text-gray-900 font-semibold placeholder-gray-400"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={changeHandler}
                  placeholder="Doe"
                  className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-orange-400 outline-none text-gray-900 font-semibold placeholder-gray-400"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={changeHandler}
                placeholder="username@gmail.com"
                className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-orange-400 outline-none text-gray-900 font-semibold placeholder-gray-400"
              />
            </div>

            {/* Password grid */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={changeHandler}
                    placeholder="Password"
                    className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-orange-400 outline-none text-gray-900 font-semibold placeholder-gray-400"
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2  cursor-pointer"
                  >
                    {showPassword ? (
                      <BiHide fill="#AFB2BF" fontSize={22} />
                    ) : (
                      <BiShow fill="#AFB2BF" fontSize={22} />
                    )}
                  </span>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmpassword"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmpassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={changeHandler}
                    placeholder="Confirm "
                    className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-orange-400 outline-none text-gray-900 font-semibold placeholder-gray-400"
                  />
                  <span
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <BiHide fill="#AFB2BF" fontSize={22} />
                    ) : (
                      <BiShow fill="#AFB2BF" fontSize={22} />
                    )}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-semibold transition"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span>Already have an account? </span>
            {
              path?"login" :""
            }
            <Link
              to="/login"
              className="text-orange-500 hover:underline font-medium"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Cute image on right side */}
        <img src={cute} alt="" className="w-[450px] h-auto opacity-100" />
      </div>
    </div>
  );
};

export default Signup;
