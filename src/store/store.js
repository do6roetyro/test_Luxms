import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../reducers/dataSlice";

// используя CS из redux toolkit для создания хранилища
// подключаем редьюсер который управляет состоянием данных
const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;
