import { fetchDataByIndex } from '../services/dataService';

// возвращает ф-ю которая принимает диспатч.
export const fetchData = (index) => async (dispatch) => {
  // первым делом диспатчим сигнал о начале загрузки данных
  dispatch({ type: 'FETCH_DATA_REQUEST' });
  try {
    // Пробуем загрузить данные: 
    // 1) Если ок то диспатчим сигнал об успехе + загруженная data + 
    // 2) Обновляем текущий индекс данных
    const data = await fetchDataByIndex(index);
    dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data });
    dispatch({ type: 'SET_DATA_INDEX', payload: index });
  } catch (error) {
    dispatch({ type: 'FETCH_DATA_FAILURE', payload: error.message });
  }
};