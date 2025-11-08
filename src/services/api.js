const BASE_URL = "https://password-genrator-82m3.onrender.com/api/";
// const BASE_URL = "http://localhost:5000/api/";


export const endPoints = {
  SENDOTP_API: BASE_URL + "auth/sendotp",
  LOGIN_API: BASE_URL + "auth/login",
  SIGNUP_API: BASE_URL + "auth/signup",
  CHANGEPASSWORD_API: BASE_URL + "auth/changePassword",
  UPDATESITES_API: BASE_URL + "auth/updatesites",

  RESETPASSWORD_API: BASE_URL + "auth/reset-password",
  RESETPASSWORDTOKEN_API: BASE_URL + "auth/reset-password-token",
};

export const profileEndPoints = {
  INSERTDATA: BASE_URL + "auth/insertData",
  GETDATA: BASE_URL + "auth/getData",
  UPDATEDATA: BASE_URL + "auth/update",
  DELETEDATA: BASE_URL + "auth/deleteData"
};
