export const cart_state = ({
  timeValidation,
  time,
  acceptBox,
  sliderDeliveryValue,
  guestData,
  message,
  distance,
  payment,
}) => {
  let payload = {};

  //console.log('guestData', guestData);

  if (timeValidation != undefined) {
    payload.timeValidation = timeValidation;
  }
  if (time) {
    payload.time = time;
  }
  if (acceptBox != undefined) {
    payload.acceptBox = acceptBox;
  }
  if (sliderDeliveryValue) {
    payload.sliderDeliveryValue = sliderDeliveryValue;
  }
  if (guestData) {
    payload.guestData = guestData;
  }
  if (message) {
    payload.message = message;
  }
  if (distance) {
    payload.distance = distance;
  }
  if (payment) {
    payload.payment = payment;
  }
  return {
    type: 'CART_STATE',
    payload,
  };
};
// Old: Since the cartstate action creator also doesn't appear to be an asynchronous action it doesn't need to return a function with a call to dispatch, it can simply return the action object with computed payload property.

//https://stackoverflow.com/questions/74295228/react-redux-only-lastet-changed-state-is-shown-correctly/74295734#74295734

/* export const cartstate = (status) => (dispatch) => {
  dispatch({
    type: 'CART_STATE',
    payload: {
      status,
      time,
      timeValidation,
      acceptBox,
    },
  });
};
 */
