/*const initialState = {
  brand: '',
  brandImage: '',
 street: '',
  streetNumber: '',
  zipCode: '',
  city: '',
  telefon: '',
}; */

const systemSettingsReducer = (state = { settings: [] }, action) => {
  switch (action.type) {
    case 'GET_SETTINGS_REQUEST':
      return { ...state };
    case 'GET_SETTINGS_SUCCESS':
      return { settings: action.payload };
    case 'GET_SETTINGS_FAILED':
      return { error: action.payload };
    default:
      return state;
  }
};

export default systemSettingsReducer;
