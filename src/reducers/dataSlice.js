import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDataByIndex } from "../services/dataService";

// Асинхронное действие для загрузки данных
// с помощью cAT (автоматически генерит типы действий pending, fulfilled, rejected) для управления состоянием асинх запроса
// функция принимает index и пытается загрузить данные с помощью fetchDataByIndex
// если ошибка то используют спец функцию rejectWithValue, которая позволяет возвращать значение ошибки при reject промиса.
export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (index, { rejectWithValue }) => {
    try {
      const data = await fetchDataByIndex(index);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// в Redux Toolkit - слайс - это упрощенная структура для описания stateб reducers and actions в одном месте.

// Состояние (state) — начальное состояние для определенной части хранилища.
// Редьюсеры (reducers) — функции, которые обновляют состояние в зависимости от экшенов.
// Экшены (actions) — генерируются автоматически для каждого редьюсера, что позволяет вам вызывать их без необходимости писать вручную.

const dataSlice = createSlice({
  name: "data", // уник имя
  initialState: {
    data: null,
    currentDataIndex: 0,
    loading: false,
    error: null,
  },
  reducers: {
    setDataIndex: (state, action) => {
      state.currentDataIndex = action.payload;
    },
  },
  // extraReducers: позволяет добавлять редьюсеры для обработки экшенов, не определенных в этом слайсе, таких как асинхронные экшены, созданные с помощью createAsyncThunk.
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setDataIndex } = dataSlice.actions;

export default dataSlice.reducer;
