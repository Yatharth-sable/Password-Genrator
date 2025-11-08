import  { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import cute from "../../Assets/cute.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../services/auth";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const changeHandler = (e) => {
    setFormData((prevdata) => ({
      ...prevdata,
      [e.target.name]: e.target.value,
    }));
  };    

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {

    e.preventDefault();
     dispatch(login(formData.email,formData.password,navigate))
     setFormData({email:"",password:"",})
  }

  return (
    <div>
      <div className="min-w-fit bg-[#f4ebe1]  min-h-screen relative  ">
        <img
          src={cute}
        //   className="scale-x-[-1] -ml-12  opacity-70  "
    className="scale-x-[-1] absolute left-0 bottom-10 -ml-32 opacity-60 w-[600px] h-auto"

          alt=""
        />

      
        <div className="top-1/2 left-1/2 h-[75%] w-[70%] transform -translate-x-1/2  -translate-y-1/2 absolute rounded-3xl bg-gradient-to-r mt-10 from-[#eacdb9] border  to-[#fae1ce]  opacity-90 z-0">
          <div className="relative w-[40%] h-full p-4">
            {/* <img src={cute} className="scale-x-[-1] opacity-90 -ml-24 "   alt="" /> */}
            <div className="bg-white rounded-2xl p-8 m-6 mx-8 shadow-md w-[370px] max-w-md bg-opacity-100">
              <p className="text-[#F25019] mb-1 text-sm">Your logo</p>
              <p className="text-3xl font-bold mb-6">Login</p>

              <form onSubmit={submitHandler}>
                {/* Email */}
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="block mb-1 text-sm font-medium text-gray-900 font-medium"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    onChange={changeHandler}
                    value={formData.email}
                    name="email"
                    placeholder="username@gmail.com"
                    className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-orange-400 outline-none text-gray-900 font-semibold placeholder-gray-400"
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className="block mb-1 text-sm font-medium text-gray-900 font-medium"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={formData.password}
                      name="password"
                      onChange={changeHandler}
                      placeholder="Password"
                      className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-orange-400 outline-none text-gray-900 font-semibold placeholder-gray-400"
                    />
                    <span
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      {showPassword ? (
                        <BiHide fill="#AFB2BF" fontSize={22} />
                      ) : (
                        <BiShow fill="#AFB2BF" fontSize={22} />
                      )}
                    </span>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end mb-5">
                  <span className="text-sm text-orange-500 cursor-pointer hover:underline">
                <Link to="/reset-password">Forgot Password?</Link>
                  </span>
                </div>

                {/* Sign in button */}
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-semibold transition"
                >
                  Sign in
                </button>
              </form>

              {/* Footer */}
              <div className="mt-6 text-center text-sm">
                <span>Don’t have an account yet? </span>
                <Link
                  to="/signup"
                  className="text-orange-500 hover:underline font-medium"
                >
                  Register for free
                </Link>
              </div>
            </div>
          </div>

        </div>
        <div className="w-full absolute top-16 transform  right-3 z-auto translate-x-1/2 opacity-100 object-cover">
          <img
            src={cute}
            width={450}
            height={400}
            className=" mt-32 ml-12 items-center flex justify-center opacity-100 z-50 "
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
