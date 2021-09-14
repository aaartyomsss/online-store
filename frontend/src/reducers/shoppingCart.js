const shoppingCartReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { productId } = action.item;
      if (!state.hasOwnProperty(productId)) {
        return { ...state, [productId]: { ...action.item, quantity: 1 } };
      } else {
        const product = { ...state[productId] };
        return {
          ...state,
          [productId]: { ...product, quantity: product.quantity + 1 },
        };
      }
    case REMOVE_FROM_CART:
      if (state[action.productId].quantity === 1) {
        const { [action.productId]: value, ...newState } = state;
        return newState;
      } else {
        const product = { ...state[action.productId] };
        return {
          ...state,
          [action.productId]: { ...product, quantity: product.quantity - 1 },
        };
      }
    default:
      return state;
  }
};

export const addToCart = (item) => {
  return { item, type: ADD_TO_CART };
};

export const removeFromCart = (productId) => {
  return { productId, type: REMOVE_FROM_CART };
};

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export default shoppingCartReducer;
