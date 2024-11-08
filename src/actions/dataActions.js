import { fetchDataByIndex } from '../services/dataService';

export const fetchData = (index) => async (dispatch) => {
  dispatch({ type: 'FETCH_DATA_REQUEST' });
  try {
    const data = await fetchDataByIndex(index);
    dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data });
    dispatch({ type: 'SET_DATA_INDEX', payload: index });
  } catch (error) {
    dispatch({ type: 'FETCH_DATA_FAILURE', payload: error.message });
  }
};