import { configureStore } from "@reduxjs/toolkit";
import gmovieReducer from "./gmovieSlice";

export const store = configureStore({
  reducer: {
    gmovieData: gmovieReducer,
  },
});
