import React, { useEffect, useState } from 'react';
import AllProducts from './layouts/AllProducts';
import Header from './components/Header';
import ProductDetail from './layouts/ProductDetail';
import Login from './components/Login';
import AddProductForm from './layouts/AddProductForm';
import { Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from './reducers/products';
import ErrorModal from './components/ErrorModal';

const App = () => {
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const productsLength = useSelector((state) => state.productsReducer.length);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    const userIdJSON = window.localStorage.getItem('loggedInUserId');
    if (token) {
      setUserToken(token);
      setUserId(parseInt(userIdJSON));
    }
  }, []);

  useEffect(() => {
    if (productsLength === 0) {
      dispatch(getAllProducts());
    }
  }, []); //eslint-disable-line

  return (
    <div>
      <Header {...{ userToken, setUserToken, setUserId }} />
      <Switch>
        <Route path="/product-detail/:productId">
          <ProductDetail userId={userId} />
        </Route>

        <Route path="/add-product">
          <AddProductForm />
        </Route>

        <Route path="/login">
          <Login setUserToken={setUserToken} setUserId={setUserId} />
        </Route>
        <Route exact path="/">
          <AllProducts userId={userId} />
        </Route>
      </Switch>
      <ErrorModal />
    </div>
  );
};

export default App;
