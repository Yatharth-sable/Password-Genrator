import React from "react";
import cute from "../../Assets/cute.svg"; // 
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcd0b1] relative overflow-hidden">
      {/* Background Blur Image */}
      <img
        src={cute}
        alt=""
        className="absolute left-0 w-[40%] opacity-30 scale-x-[-1] blur-sm"
      />

      {/* Center Glass Container */}
      <div className="absolute w-[80%] h-[70%] bg-[#FEDCC5]/80 backdrop-blur-xl border border-white/40 rounded-2xl shadow-xl flex items-center justify-between px-10">
        
        {/* Left Side — Error Message */}
        <div className="text-center flex flex-col items-center justify-center w-[50%]">
          <h1 className="text-[120px] font-extrabold text-[#fc6a03] drop-shadow-md">
            404
          </h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-3">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8 text-sm">
            Oops! The page you’re looking for doesn’t exist or was moved.
          </p>

         
            
          <div className="bg-[#fc6a03] text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-all">
            <Link to="/">   Back to Home </Link>
          </div>
        </div>

        {/* Right Side — Mascot */}
        <img
          src={cute}
          alt="lost mascot"
          className="w-[350px] object-contain opacity-90"
        />
      </div>
    </div>
  );
};

export default Error;
