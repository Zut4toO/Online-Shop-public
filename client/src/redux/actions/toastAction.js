export const showToast = (status) => (dispatch) => {
  dispatch({
    type: 'TOAST_STATUS',
    payload: status,
  });
};
