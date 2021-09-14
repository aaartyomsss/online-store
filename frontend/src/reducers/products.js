import productService from '../services/productService';
import { showErrorModal } from '../reducers/errorModal';

const productsReducer = (state = [], action) => {
  switch (action.type) {
    case INIT:
      return action.data;
    case ADD:
      return state.concat(action.data);
    case SUBTRACT_QUANTITY:
      return state.map((item) => {
        if (item.id === action.id) {
          const newQuantity = item.quantity - 1;
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    case APPEND_QUANTITY:
      return state.map((item) => {
        if (item.id === action.id) {
          const newQuantity = item.quantity + 1;
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.id);
    case UPDATE:
      return state.map((product) => {
        if (product.id === action.data.id) {
          return action.data;
        }
        return product;
      });
    default:
      return state;
  }
};

export const getAllProducts = () => {
  return async (dispatch) => {
    const data = await productService.getAllProducts();
    dispatch({ data, type: INIT });
  };
};

export const addNewProduct = (formData) => {
  return async (dispatch) => {
    const data = await productService.addProduct(formData);
    dispatch({
      data,
      type: ADD,
    });
  };
};

export const updateProduct = (productId, formData) => {
  return async (dispatch) => {
    const data = await productService.updateProduct(productId, formData);
    if (!data) {
      dispatch(
        showErrorModal('Check that you have entered data in a valid format!')
      );
    }
    dispatch({
      data,
      type: UPDATE,
    });
  };
};

export const subtractQuantity = (id) => {
  return {
    id,
    type: SUBTRACT_QUANTITY,
  };
};

export const appendQuantity = (id) => {
  return {
    id,
    type: APPEND_QUANTITY,
  };
};

export const deleteProduct = (id) => {
  return { id, type: DELETE_PRODUCT };
};

const INIT = 'INIT';
const ADD = 'ADD';
const SUBTRACT_QUANTITY = 'SUBTRACT_QUANTITY';
const APPEND_QUANTITY = 'APPEND_QUANTITY';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const UPDATE = 'UPDATE';

export default productsReducer;
