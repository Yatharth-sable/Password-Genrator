import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileDropDown from "./common/ProfileDropDown";

const Navbar = () => {

  const {token} = useSelector((state) => state.auth)
  const navigate= useNavigate();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    navigate("/")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const location = useLocation();
  const lastSegment = location.pathname.split("/").pop(); // gets "login" or "signup"

  return (
    <nav className="w-full bg-gradient-to-r from-[#f9c99b] via-[#fcd0b1] to-[#fae3cc] shadow-lg backdrop-blur-sm fixed top-0  z-50 ">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-8 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-3xl font-extrabold text-[#2c2c2c] tracking-tight flex items-center">
            <Link to="/">
              <span className="text-[#f25c19]">&lt;</span>
              Pass
              <span className="text-[#f25c19]">OP/&gt;</span>
            </Link>
          </div>
        </div>

          <ul className="hidden md:flex gap-8 text-[16px] font-medium text-gray-700">
          <li className="hover:text-[#f25c19] transition-colors duration-300 cursor-pointer">
            <button onClick={() => scrollToSection("home")}>
                    <Link to="/">Home</Link>{" "}

            </button>
          </li>
          <li className="hover:text-[#f25c19] transition-colors duration-300 cursor-pointer">
            <button onClick={() => scrollToSection("about")}>About</button>
          </li>
          <li className="hover:text-[#f25c19] transition-colors duration-300 cursor-pointer">
            <button onClick={() => scrollToSection("contact")}>Contact</button>
          </li>
        </ul>

        {/* Navigation Links (optional) */}
         {
          token === null && (   < >
           

        <div className="flex flex-row w-fit  w-10 gap-2 text-white font-semibold ">
          <button
            className={` rounded-2xl    ${lastSegment === "login" ? " text-black" : "bg-orange-500" }
            p-2 px-3 hover:scale-105 shadow-md transition-all duration-300 hover:bg-[#e25514]`}
          >
            <Link to="/signup"> Signup</Link>
          </button>

          <button
            className={`rounded-2xl  ${lastSegment === "signup" ? " text-black" : "bg-orange-500 "}  p-2 px-3 hover:scale-105 shadow-md transition-all duration-300 hover:bg-[#e25514] `}
          >
            <Link to="/login"> Login</Link>
          </button>
        </div>
      </>)
         }


         {
          token !== null && <><ProfileDropDown></ProfileDropDown></>
         }

      </div>
    </nav>
  );
};

export default Navbar;
