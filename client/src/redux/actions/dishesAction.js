import axios from 'axios';

export const getAllDishes = () => async (dispatch) => {
  dispatch({ type: 'GET_DISHES_REQUEST' });

  try {
    const response = await axios.get('/api/products');
    dispatch({ type: 'GET_DISHES_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'GET_DISHES_FAILED', payload: error });
  }
};

export const reload_category = () => (dispatch) => {
  dispatch({ type: 'RELOAD_CATEGORY' });
};
export const reload_extras = () => (dispatch) => {
  dispatch({ type: 'RELOAD_EXTRAS' });
};
export const reload_remove = () => (dispatch) => {
  dispatch({ type: 'RELOAD_REMOVE' });
};
export const reload_additives = () => (dispatch) => {
  dispatch({ type: 'RELOAD_ADDITIVES' });
};
