import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    isLoggedInOn: (state, action) => {
      return {
        ...state,
        isLoggedIn: true,
      };
    },
    isLoggedInOff: (state, action) => {
      return {
        ...state,
        isLoggedIn: false,
      };
    },
  }
});

// Reducerをエクスポートする
export default slice.reducer;

// Action Creatorsをエクスポートする
export const { isLoggedInOn, isLoggedInOff } = slice.actions;
