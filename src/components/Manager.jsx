import React, { useEffect, useRef, useState } from "react";
import eye from "../Assets/eye.png";
import eyeCross from "../Assets/eyecross.png";
import { ToastContainer, Bounce, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  insertData,
  fetchData,
  deleteSite,
  updatesites,
} from "../services/auth";
import { setLoading } from "../slice/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "./Footer";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [edit, setedit] = useState(false);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  // ✅ Password generator function
  const generatePassword = () => {
    const length = 16;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]|:;<>,.?/~`";
    let generated = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generated += charset[randomIndex];
    }
    setForm((prev) => ({ ...prev, password: generated }));
    toast.success("Strong password generated!");
  };

  const handleEye = () => {
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
      ref.current.src = eyeCross;
    } else {
      passwordRef.current.type = "password";
      ref.current.src = eye;
    }
  };

  // saved password
  const savePassword = async () => {
    if (
      form.site.length > 5 &&
      form.username.length > 1 &&
      form.password.length >= 8
    ) {
      if (edit) {
        {
          window.confirm("Want update the Password") &&
            (await updatesites(token, form, form._id));
          setedit(false);
        }

      } else {
        {
          window.confirm("Want to save the Password") &&
            (await dispatch(insertData(form, token)));
        }
      }
      setForm({ site: "", username: "", password: "" });
      await getData(token);
    } else {
      if (form.site.length < 5) toast.error("Site name is too short");
      else if (form.username.length < 1)
        toast.error("Username cannot be empty");
      else if (form.password.length < 8)
        toast.error("Minimum password length is 8");
    }
  };

  const getData = async (token) => {
    dispatch(setLoading(true));
    const response = await fetchData(token);
    setPasswordArray(response || []);
    setVisiblePasswords({});
    dispatch(setLoading(false));
  };

  useEffect(() => {
    if (token) getData(token);
  }, [token]);

  // delete password

  const deletePassword = async (siteId) => {
    dispatch(setLoading(true));
    const confirm = window.confirm("Do you want to delete this password?");
    if (confirm) {
      await deleteSite(siteId, token);
      await getData(token);
      toast.success("Deleted successfully");
    }
    dispatch(setLoading(false));
  };

  // edit password
  const editPassword = async (siteId) => {
    // siteId.preventDefault();
    dispatch(setLoading(true));
    const record = passwordArray.find((item) => item._id === siteId);

    setForm({
      site: record.siteName,
      username: record.userName,
      password: record.password,
      _id: record._id,
    });

    setedit(true); // put the form in edit mode

    dispatch(setLoading(false));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        delay: i * 0.1,
      },
    }),
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        transition={Bounce}
      />

      <div className="min-h-screen bg-slate-50 relative text-slate-900 mt-16 pb-16">
        <div className="absolute   inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="container min-h-[1000px] mx-auto p-4 max-w-4xl">
          <motion.header
            className="py-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold text-center tracking-tight">
              <span className="text-orange-500">&lt;</span>
              Pass
              <span className="text-orange-500">OP /&gt;</span>
            </h1>
            <p className="text-slate-600 text-lg text-center mt-2">
              Your Personal Password Vault
            </p>
          </motion.header>

          {/* ======================= Add Password Form ======================= */}
          <motion.div
            className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <h2 className="text-2xl font-bold mb-6 text-slate-800">
              Add a New Password
            </h2>
            <div className="flex flex-col gap-5">
              <input
                type="text"
                name="site"
                onChange={handleChange}
                value={form.site}
                placeholder="Website URL (e.g., https://example.com)"
                className="w-full p-3 bg-slate-100 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              />
              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  value={form.username}
                  placeholder="Username / Email"
                  className="w-full p-3 bg-slate-100 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                />
                <div className="relative flex">
                  <input
                    type="password"
                    name="password"
                    ref={passwordRef}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full p-3 pr-24 bg-slate-100 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  />
                  <span
                    className="absolute top-1/2 right-10 -translate-y-1/2 cursor-pointer"
                    onClick={handleEye}
                  >
                    <img
                      ref={ref}
                      src={eye}
                      width={22}
                      height={22}
                      alt="Toggle password visibility"
                      className="opacity-50"
                    />
                  </span>
                  {/* ✅ Generate Password Button */}
                </div>
              </div>
              <div className="flex flex-row gap-4 justify-end">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  onClick={generatePassword}
                  className="flex justify-center items-center  w-full sm:w-fit sm:self-end px-2 py-1 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                >
                  Genreate Passoword
                </motion.button>

                <motion.button
                  onClick={savePassword}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="flex justify-center items-center gap-2 w-full sm:w-fit sm:self-end px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/gdzgkrni.json"
                    trigger="hover"
                    colors="primary:#ffffff"
                    style={{ width: "24px", height: "24px" }}
                  ></lord-icon>
                  {edit ? "Edit Password" : "Save Password"}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* ======================= Password List ======================= */}
          <motion.div
            className="mt-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <h2 className="text-2xl font-bold mb-4 text-slate-800">
              Your Saved Passwords
            </h2>
            {passwordArray.length === 0 ? (
              <div className="text-center text-slate-500 py-10 bg-white rounded-lg shadow-sm border border-slate-200">
                <p>No passwords saved yet. Add one above to get started!</p>
              </div>
            ) : (
              <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-slate-200">
                <table className="w-full text-sm text-left text-slate-700">
                  <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                    <tr>
                      <th className="px-6 py-4">Site</th>
                      <th className="px-6 py-4">Username</th>
                      <th className="px-6 py-4">Password</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <AnimatePresence>
                    {passwordArray.map((item) => (
                      <motion.tr
                        key={item._id}
                        layout
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{
                          opacity: 0,
                          x: -50,
                          transition: { duration: 0.2 },
                        }}
                        className="border-b border-slate-200 hover:bg-orange-50/50"
                      >
                        <td className="px-6 py-4 font-medium text-slate-900">
                          <div className="flex items-center gap-2 group">
                            <a
                              href={item.siteName}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:text-orange-600 transition-colors"
                            >
                              {item.siteName}
                            </a>
                            <div
                              onClick={() => copyText(item.siteName)}
                              className="cursor-pointer opacity-0 group-hover:opacity-60 transition-opacity"
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                                style={{ width: "20px", height: "20px" }}
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 group">
                            <span>{item.userName}</span>
                            <div
                              onClick={() => copyText(item.userName)}
                              className="cursor-pointer opacity-0 group-hover:opacity-60 transition-opacity"
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                                style={{ width: "20px", height: "20px" }}
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 group">
                            <span className="font-mono tracking-wider">
                              {visiblePasswords[item._id]
                                ? item.password
                                : "•".repeat(item.password.length)}
                            </span>
                            <img
                              src={visiblePasswords[item._id] ? eyeCross : eye}
                              onClick={() => togglePasswordVisibility(item._id)}
                              className="cursor-pointer opacity-50 hover:opacity-100"
                              width={20}
                              height={20}
                              alt="Toggle visibility"
                            />
                            <div
                              onClick={() => copyText(item.password)}
                              className="cursor-pointer opacity-0 group-hover:opacity-60 transition-opacity"
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                                style={{ width: "20px", height: "20px" }}
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center items-center gap-3">
                            <div
                              onClick={() => editPassword(item._id)}
                              className="cursor-pointer opacity-60 hover:opacity-100"
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                trigger="hover"
                                style={{ width: "24px", height: "24px" }}
                              ></lord-icon>
                            </div>
                            <div
                              onClick={() => deletePassword(item._id)}
                              className="cursor-pointer opacity-60 hover:opacity-100"
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/skkahier.json"
                                trigger="hover"
                                style={{ width: "24px", height: "24px" }}
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </table>
              </div>
            )}
          </motion.div>
        </div>
        <div className="flex flex-row justify-center bottom-0 mt-10 items-center">
          <Footer></Footer>
        </div>
      </div>
    </>
  );
};

export default Manager;
