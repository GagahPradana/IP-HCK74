import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bannerData: [],
};

export const gmovieSlice = createSlice({
  name: "gmovie",
  initialState,
  reducers: {
    setBannerData: (state, action) => {
      state.bannerData = action.payload;
    },
  },
});

export const { setBannerData } = gmovieSlice.actions;

export default gmovieSlice.reducer;
