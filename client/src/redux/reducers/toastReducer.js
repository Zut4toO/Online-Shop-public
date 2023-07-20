export const toastReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOAST_STATUS':
      return {
        state,
        status: action.payload,
      };
    default:
      return state;
  }
};
