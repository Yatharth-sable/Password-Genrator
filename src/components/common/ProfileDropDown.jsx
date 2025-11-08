import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { logout } from "../../services/auth";

const ProfileDropDown = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const {user} = useSelector((state) => state.auth)

  return (
    <div className="relative cursor-pointer ml-16 ">
      <div 
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
       onClick={() => setOpen((prev) => !prev)}  >
         <div className="w-10 h-10 bg-gradient-to-tr from-[#fc6a03] to-[#ffb37a] rounded-full flex items-center justify-center text-white text-lg font-bold shadow-md">
              {user?.firstName?.[0]?.toUpperCase() || "U"}
              {user?.lastName?.[0]?.toUpperCase() || "U"}
            </div>
        <AiOutlineCaretDown className="absolute top-3 right-10"></AiOutlineCaretDown>

        {open === true && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-10 -mt-4 z-10 m bg-white opacity-80 rounded-xl py-2 px-3 items-center justify-center   text-sm "
          >
            <button
              className="right-0 z-[1000] hover:text-green-500 transition-all p-2 duration-75 divide-richblack-700 overflow-hidden  rounded-md bg-richblack-800"
              onClick={(e) => e.stopPropagation()}
            >
              <Link to="profile">Dashboard</Link>
            </button>
            <button
              className="flex w-full items-center gap-x-1 py-[5px] px-[5px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-red-600 "
              onClick={(e) => {
                e.stopPropagation();
                window.confirm("Do you want to logout") &&  dispatch(logout(navigate));
               
              }}
            >
              <VscSignOut className="text-lg " />
              Logout
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProfileDropDown;
