export const getAllDishesReducer = (state = { dishes: [] }, action) => {
  switch (action.type) {
    case 'GET_DISHES_REQUEST':
      return {
        loading: true,
        ...state,
      };
    case 'GET_DISHES_SUCCESS':
      return {
        loading: false,
        dishes: action.payload,
      };
    case 'GET_DISHES_FAILED':
      return {
        error: action.payload,
        loading: false,
      };
    case 'RELOAD_CATEGORY':
      return {
        ...state,
        reload: Math.random(),
      };
    case 'RELOAD_EXTRAS':
      return {
        ...state,
        reload: Math.random(),
      };
    case 'RELOAD_REMOVE':
      return {
        ...state,
        reload: Math.random(),
      };
    case 'RELOAD_ADDITIVES':
      return {
        ...state,
        reload: Math.random(),
      };
    default:
      return state;
  }
};
