import React, { useState } from 'react'
import { motion } from "framer-motion";
import { Outlet } from 'react-router-dom';
import About from './AboutPage';
import Contact from './ContactusPage';
import { useSelector } from 'react-redux';

const Homepage = () => {

  const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const {token} = useSelector((state) => state.auth)

  return (
   <div>
    
      <section id="home"  className="min-h-screen bg-gradient-to-br from-white via-[#fff7f3] to-[#fff2ec] flex flex-col items-center justify-center relative overflow-hidden">

      {/* Soft background blobs */}
      <motion.div
        className="absolute w-72 h-72 bg-[#fc6a03]/10 rounded-full blur-3xl top-10 left-10"
        animate={{ y: [0, 25, 0], x: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}

      ></motion.div>

      <motion.div
        className="absolute w-64 h-64 bg-[#fc6a03]/10 rounded-full blur-3xl bottom-10 right-10"
        animate={{ y: [0, -25, 0], x: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>

      {/* Main glass container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white/60 backdrop-blur-md border border-[#fc6a03]/20 rounded-2xl shadow-lg p-10 text-center w-[90%] md:w-[70%] lg:w-[60%]"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-6xl font-extrabold text-[#fc6a03] drop-shadow-sm mb-4"
        >
          Welcome to PassOP
        </motion.h1>

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto mb-8"
        >
          Simplify your online life with secure password storage — all your
          credentials, safely encrypted, beautifully managed.
        </motion.p>

      {/* if token is null */}
          {
           token === null &&    <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5   }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="/login"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#fc6a03] text-white px-8 py-3 rounded-md font-semibold shadow-md hover:bg-orange-600 transition"
          >
            Get Started
          </motion.a>

          <motion.a
            href="/signup"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-[#fc6a03] border border-[#fc6a03] px-8 py-3 rounded-md font-semibold shadow-sm hover:bg-orange-50 transition"
          >
            Register Now
          </motion.a>
        </motion.div>
          }

{/*  token is not nulll  */}
          {
           token !== null &&  <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5   }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="/dashboard"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-500 text-white px-8 py-3 rounded-md font-semibold shadow-md hover:bg-green-600 transition"
          >
           Open Your Password Vault
          </motion.a>

        </motion.div>
          }

        {/* Animated feature cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {[
            {
              title: "Secure Encryption",
              desc: "All your passwords are locked using AES-256 encryption for maximum safety.",
            },
            {
              title: "Auto Sync",
              desc: "Your data syncs seamlessly across all your devices — instantly and securely.",
            },
            {
              title: "One Click Login",
              desc: "Access websites faster with autofill and one-click login features.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.2 }}
              // whileHover={{ y: -8, scale: 1.02  }}
              className="bg-white border border-[#fc6a03]/20 rounded-xl hover:scale-150 shadow-md p-6 text-left hover:shadow-lg transition"
            >
              <h3 className="text-[#fc6a03] font-semibold text-lg mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      </section>
          <section id="about" className="min-h-screen">
        <About />
      </section>

   <section id="contact" className="min-h-screen">
        <Contact />
      </section>
    
    </div>
  )
}

export default Homepage
