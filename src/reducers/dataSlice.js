import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDataByIndex } from '../services/dataService';

// Асинхронное действие для загрузки данных
export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (index, { rejectWithValue }) => {
    try {
      const data = await fetchDataByIndex(index);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const dataSlice = createSlice({
  name: 'data',
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