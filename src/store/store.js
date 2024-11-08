import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../reducers/dataSlice";

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;
