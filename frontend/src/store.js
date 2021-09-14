import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import shoppingCartReducer from './reducers/shoppingCart';
import productsReducer from './reducers/products';
import errorModalReducer from './reducers/errorModal';

const reducer = combineReducers({
  shoppingCartReducer,
  productsReducer,
  errorModalReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
