import ACTIONS from './index';
import axios from 'axios';

export const dispatchLogin = () => {
  return {
    type: ACTIONS.LOGIN,
  };
};

export const fetchUser = async (token) => {
  const res = await axios.get('/user/infor', {
    headers: { Authorization: token },
  });
  return res;
};

export const dispatchGetUser = (res) => {
  return {
    type: ACTIONS.GET_USER,
    payload: {
      user: res.data,
      isAdmin: res.data.role === 1 ? true : false,
      isSupport: res.data.role === 2 ? true : false,
      isMasterAdmin: res.data.role === 3 ? true : false,
    },
  };
};

export const reload_userinfor = (payload) => (dispatch) => {
  dispatch({ type: 'RELOAD_USERINFOR', payload });
};
