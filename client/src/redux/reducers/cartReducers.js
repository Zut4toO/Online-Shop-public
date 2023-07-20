export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const alreadyExists = state.cartItems.find(
        (item) => item.key === action.payload.key
      );
      if (alreadyExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.key === action.payload.key
              ? {
                  ...action.payload,
                  quantity: action.payload.canDirectUpdate
                    ? action.payload.quantity
                    : action.payload.quantity + item.quantity,
                  price: action.payload.canDirectUpdate
                    ? action.payload.price
                    : parseInt(action.payload.price) + parseInt(item.price),
                }
              : item
          ),
          //success: false,
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
          //success: true,
        };
      }
    case 'DELETE_FROM_CART':
      /*       console.log(action.payload);
      console.log('id', action.payload._id);
      console.log('variant', action.payload.variantName);
      console.log('cartitems', state.cartItems[0]); */
      let dish = action.payload;
      let key =
        dish.name +
        dish.variantName +
        dish.toppings
          .map((item) => item.label)
          .sort()
          .toString() +
        dish.removeIng
          .map((item) => item.label)
          .sort()
          .toString();
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.key != key),
      };
    case 'UPDATE_QUANTITY': {
      const alreadyExists = state.cartItems.find(
        (item) => item.key === action.payload.key
      );
      if (alreadyExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.key === action.payload.key ? action.payload : item
          ),
          //success: false,
        };
      }
    }

    case 'RELOAD_ORDERS':
      return {
        ...state,
        reload: Math.random(),
      };
    default:
      return state;
  }
};
