import { toast  } from "react-toastify";
import { endPoints } from "./api.js";
import { profileEndPoints } from "./api.js";
import { apiConnector } from "./apiConnector.js";
import { setLoading, setToken, setUser } from "../slice/authSlice.js";



const {
  SENDOTP_API,
  LOGIN_API,
  SIGNUP_API,
  CHANGEPASSWORD_API,
  UPDATESITES_API,

  RESETPASSWORDTOKEN_API,
  RESETPASSWORD_API,
} = endPoints;

const { INSERTDATA, GETDATA, UPDATEDATA, DELETEDATA } = profileEndPoints;

// 

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("loading..");
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        // checkUserPresent: true,
      });
      console.log("the problem is here ");
      console.log("SENDOTP API RESPONSE >>...>>", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      navigate("/verify-email");
      toast.success("OTP Sent Successfully");
    } catch (error) {
      console.log("SENDOTP API ERROR............", error.message);
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading(".loading");
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user))


      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Login Success");

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user",JSON.stringify(response.data.user));

      navigate("/dashboard");

    } catch (error) {
      console.log("Login API ERRORa............", error.response.data.message );
      toast.error(error.response.data.message );
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function signUp(
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("loading...>>>..>>.>");
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });


      if (!response.data.success) {
        console.log("error in signup", response.data.message);
      }

      toast.success("Signup SuccessFully......");
      navigate("/login");
    } catch (error) {
      console.log("SENDOTP API ERROR............", error.message);
      toast.error("Could Not Send OTP");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function insertData(data, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading");

    try {
      const response = await apiConnector(
        "PUT",
        INSERTDATA,
        {
          siteName: data.site,
          userName: data.username,
          password: data.password,
          id: data?.id,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      console.log("InsertData Response", response);

      if (!response?.data?.success) {
        throw new Error("Could Not Able to inset Data");
      }

      toast.success("Password Insert");
    } catch (error) {
      console.log("insetData API ERROR............", error.message);
      console.log("insetData API ERROR............", error);
      toast.error("Could Not Send Data");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
export const fetchData = async (token) => {
  let result = null;
  try {
    const response = await apiConnector(
      "GET",
      GETDATA,
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("FetchData Response", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Able to Fetch Data");
    }

    result = response?.data?.data;
  } catch (error) {
    console.log("FetchData API ERROR............", error.message);
    // toast.error("Could Not Fetch Data");
  }
  return result;
};

export const deleteSite = async (siteId,token) => {
  try {
    const response = await apiConnector(
      "DELETE",
      DELETEDATA,
      { siteId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("FetchData Response", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Able to Fetch Data");
    }
  } catch (error) {
    console.log("FetchData API ERROR............", error.message);
    toast.error("Delete Fail");
  }
};


export function logout(navigate) {
   return async (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null))
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logout SuccessFully")
    navigate("/");


   }
}


export async function changePassword(token, formData) {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CHANGEPASSWORD_API, {
      password:formData.oldPassword,
      newPassword:formData.password,
      confirmNewPassword:formData.confirmPassword
    }, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CHANGE_PASSWORD_API API RESPONSE............", response)
    toast.success("Password Changed Successfully")

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
  } catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR............", error)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
}

export async function updatesites(token, formData,siteId) {

  console.log("UPDATEDITE API RESPOaNaSE............", siteId)
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector("PUT", UPDATESITES_API, {
      siteName:formData.site,
      userName:formData.username,
      password:formData.password,
      siteId:siteId
    }, {
      Authorization: `Bearer ${token}`,
    })

    console.log("UPDATEDITE API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast(" PASSWORD Updated Successfully")
  } catch (error) {
    console.log("UPDATEDITE API ERROR............", error)
    toast.error(error.response.data.message)
    toast.error("not change password")
  }
  toast.dismiss(toastId)
}

export function getPasswordResetToken(email,setEmailSent) {
  return async (dispatch) => {
  const toastId = toast.loading("Loading...")
    dispatch(setLoading(true));
   
    try {
      const response = await apiConnector("POST", RESETPASSWORDTOKEN_API, {
        email,
      });
      console.log("Reset Password Token Response ", response);
      
      if (!response.data.success) {
        toast.error("Reset Email Not send ");
         throw new Error("response.data.message");
      }
      setEmailSent(true)
      toast.success("Email Send SuccesFully");
      // setEmailSent(true);
    } catch (err) {
      console.log("Reset Password Token Error ");
      toast.error(err.response.data.message)
    }
    dispatch(setLoading(false));
  toast.dismiss(toastId)

  };
}

// reset password
export function resetPassword(password, confirmPassword, token) {
  return async (dispatch) => {

    dispatch(setLoading(true));
     const toastId = toast.loading("Loading..")
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      });
      
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Reset Password Successfully");
    } catch (err) {
      console.log("Reset Password Error ");
      toast.error(err.response.data.message);
    }
    dispatch(setLoading(false));
   toast.dismiss(toastId)

  };
}

