import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const addToCart =
  (
    dish,
    quantity,
    variant,
    variantName,
    toppings,
    removeIng,
    sumOfToppings,
    canDirectUpdate
  ) =>
  (dispatch, getState) => {
    var cartItem = {
      name: dish.name,
      _id: dish._id,
      image: dish.image,
      variant: variant,
      variantName: variantName,
      quantity: Number(quantity),
      toppings: toppings,
      removeIng: removeIng,
      prices: dish.prices,
      sumOfToppings: sumOfToppings,
      canDirectUpdate: canDirectUpdate,
      price: (parseFloat(variant) + sumOfToppings) * quantity,
      key:
        dish.name +
        variantName +
        toppings
          .map((item) => item.label)
          .sort()
          .toString() +
        removeIng
          .map((item) => item.label)
          .sort()
          .toString(),
    };
    if (cartItem.quantity > 20) {
      toast.info('Du kannst diesen Artikel maximal 20 mal hinzufügen', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      if (cartItem.quantity < 1) {
        dispatch({
          type: 'DELETE_FROM_CART',
          payload: dish,
        });
        toast.info('Arikel erfolgreich entfernt', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        dispatch({
          type: 'ADD_TO_CART',
          payload: cartItem,
        });
      }
    }

    const cartItems = getState().cartReducer.cartItems;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

export const deleteFromCart = (dish) => (dispatch, getState) => {
  dispatch({
    type: 'DELETE_FROM_CART',
    payload: dish,
  });
  const cartItems = getState().cartReducer.cartItems;
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  toast.info('Arikel erfolgreich entfernt', {
    position: toast.POSITION.BOTTOM_RIGHT,
  });
};
export const orderSuccessRemoveFromCart = (dish) => (dispatch, getState) => {
  dispatch({
    type: 'DELETE_FROM_CART',
    payload: dish,
  });
  const cartItems = getState().cartReducer.cartItems;
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const reload_orders = () => (dispatch) => {
  dispatch({ type: 'RELOAD_ORDERS' });
};
