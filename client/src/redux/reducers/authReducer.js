import ACTIONS from '../actions/';

const initialState = {
  user: [],
  isLogged: false,
  isAdmin: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        isLogged: true,
      };
    case ACTIONS.GET_USER:
      return {
        ...state,
        user: action.payload.user,
        isAdmin: action.payload.isAdmin,
        isSupport: action.payload.isSupport,
        isMasterAdmin: action.payload.isMasterAdmin,
      };
    case 'RELOAD_USERINFOR':
      return {
        ...state,
        user: { ...state.user, ...action.payload },
        reload: Math.random(),
      };
    default:
      return state;
  }
};

export default authReducer;
