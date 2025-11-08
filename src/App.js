import "./App.css";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import Manager from "./components/Manager";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import VerifyOtp from "./components/Authentication/VerifyOtp";
import { Bounce, ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Error from "./components/common/Error";
import Homepage from "./components/Pages/Homepage";
import Profile from "./components/Pages/Profile";
import ResetPassword from "./components/Pages/ResetPassword";
import UpdatePassword from "./components/Pages/UpdatePassword";

function App() {
  return (
    <div className="flex flex-col font-inter w-full min-h-[100vh] bg-richblack-900 overflow-x-hidden">
     <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
transition={Bounce}
/>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/verify-email" element={<VerifyOtp></VerifyOtp>}></Route>
        <Route path="/reset-password" element={<ResetPassword></ResetPassword>}></Route>
        <Route path="/update-password/:id" element={<UpdatePassword></UpdatePassword>}></Route>



        <Route path="/" element={<Homepage></Homepage>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>


        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Manager />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Error></Error>}></Route>
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
