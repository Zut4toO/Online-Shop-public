export const cartStateReducer = (state = { guestData: {} }, action) => {
  switch (action.type) {
    case 'CART_STATE':
      // state[Object.keys(action.payload)[0]] =
      //   action.payload[Object.keys(action.payload)[0]];

      return {
        ...state,
        ...action.payload,
        /* time: action.payload.time || state.time,
        timeValidation: action.payload.timeValidation || state.timeValidation,
        acceptBox: action.payload.acceptBox || state.acceptbox,
        sliderDeliveryValue:
          action.payload.sliderDeliveryValue || state.sliderDeliveryValue,
        guestData: action.payload.guestData || state.guestData, */
      };
    default:
      return state;
  }
};
