import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import { getAllDishesReducer } from './reducers/dishesReducers';
import { cartReducer } from './reducers/cartReducers';
import { toastReducer } from './reducers/toastReducer';
import { cartStateReducer } from './reducers/cartStateReducer';

import systemSettingsReducer from './reducers/systemSettingsReducer';
import auth from './reducers/authReducer';
import token from './reducers/tokenReducer';
import users from './reducers/usersReducer';

const finalReducer = combineReducers({
  getAllDishesReducer,
  cartReducer,
  toastReducer,
  cartStateReducer,
  auth,
  token,
  users,
  systemSettingsReducer,
});

const cartItems = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const initialState = {
  cartReducer: {
    cartItems: cartItems,
  },
};

const composeEnhancer = composeWithDevTools({});

const store = createStore(
  finalReducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
