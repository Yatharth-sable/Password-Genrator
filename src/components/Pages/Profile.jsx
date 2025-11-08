import { useState } from "react";
import { Eye, EyeOff, Lock, User, Mail, Shield, ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../services/auth";
import Footer from "../Footer";

const Profile = () => {
  const { token, user } = useSelector((state) => state.auth);
  const [show, setShow] = useState({ old: false, new: false, confirm: false });
  const [form, setForm] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await changePassword(token, form);
  };

  return (
    <div className="min-h-screen  relative w-full bg-gradient-to-b from-[#fff5ed] via-[#ffe9d6] to-[#fff0e3] flex flex-col items-center justify-center py-10 px-6">
      {/* Header */}
      <div className="absolute top-6 left-6 flex items-center gap-2 pt-14">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#fc6a03] font-semibold hover:text-orange-700 transition"
        >
          <ArrowLeft size={20} /> Back
        </button>
      </div>

      <h1 className="text-3xl font-extrabold text-[#fc6a03] mb-10 tracking-tight">
        Account Overview
      </h1>

      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-10">
        {/* Profile Info Section */}
        <div className="bg-white border border-orange-100 shadow-lg rounded-2xl p-8 flex flex-col justify-center">
          <div className="flex flex-col items-center space-y-3 mb-6">
            <div className="w-20 h-20 bg-gradient-to-tr from-[#fc6a03] to-[#ffb37a] rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md">
              {user?.firstName?.[0]?.toUpperCase() || "U"}
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>
          </div>

          <div className="border-t border-orange-100 my-4"></div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <User size={18} className="text-[#fc6a03]" />
              <span>
                <strong>First Name:</strong> {user?.firstName || "Not set"}
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <User size={18} className="text-[#fc6a03]" />
              <span>
                <strong>Last Name:</strong> {user?.lastName || "Not set"}
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Mail size={18} className="text-[#fc6a03]" />
              <span>
                <strong>Email:</strong> {user?.email || "Not set"}
              </span>
            </div>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="bg-[#fffdfb] border border-orange-100 shadow-xl rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <Shield size={22} className="text-[#fc6a03]" />
            <h2 className="text-xl font-bold text-[#fc6a03]">Change Password</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Old Password */}
            <div className="relative">
              <label
                htmlFor="oldPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Old Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-3 text-[#fc6a03]/70"
                />
                <input
                  type={show.old ? "text" : "password"}
                  id="oldPassword"
                  name="oldPassword"
                  value={form.oldPassword}
                  onChange={handleChange}
                  placeholder="Enter current password"
                  className="w-full border border-orange-200 rounded-lg pl-10 pr-10 py-2 outline-none focus:ring-2 focus:ring-[#fc6a03] transition"
                />
                <button
                  type="button"
                  onClick={() => setShow((p) => ({ ...p, old: !p.old }))}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-[#fc6a03]"
                >
                  {show.old ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-3 text-[#fc6a03]/70"
                />
                <input
                  type={show.new ? "text" : "password"}
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className="w-full border border-orange-200 rounded-lg pl-10 pr-10 py-2 outline-none focus:ring-2 focus:ring-[#fc6a03] transition"
                />
                <button
                  type="button"
                  onClick={() => setShow((p) => ({ ...p, new: !p.new }))}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-[#fc6a03]"
                >
                  {show.new ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-3 text-[#fc6a03]/70"
                />
                <input
                  type={show.confirm ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter new password"
                  className="w-full border border-orange-200 rounded-lg pl-10 pr-10 py-2 outline-none focus:ring-2 focus:ring-[#fc6a03] transition"
                />
                <button
                  type="button"
                  onClick={() => setShow((p) => ({ ...p, confirm: !p.confirm }))}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-[#fc6a03]"
                >
                  {show.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-[#fc6a03] text-white font-semibold py-3 rounded-lg shadow-md hover:bg-orange-600 transition"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
      <Footer className="bottom-0 absolute flex"></Footer>
    </div>
  );
};

export default Profile;
