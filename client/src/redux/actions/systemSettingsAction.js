// Import index file to get type from index
import axios from 'axios';

export const systemSettings = () => async (dispatch) => {
  dispatch({ type: 'GET_SETTINGS_REQUEST' });
  try {
    const res = await axios.get('/api/settings');
    //console.log(res);
    dispatch({ type: 'GET_SETTINGS_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'GET_SETTINGS_FAILED', payload: error });
  }
};
