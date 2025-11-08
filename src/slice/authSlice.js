import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  loading: false,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
   user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) :null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setUser(state,action){
      state.user = action.payload
    }
    
  },
});

export const { setSignupData, setToken, setLoading ,setUser} = authSlice.actions;

export default authSlice.reducer;
