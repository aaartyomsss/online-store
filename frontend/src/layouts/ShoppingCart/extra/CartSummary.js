import React from 'react';
import { Divider } from '@material-ui/core';
import '../assets/CartSummary.css';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../../reducers/shoppingCart';
import { appendQuantity } from '../../../reducers/products';

const CartSummary = ({ cart }) => {
  const dispatch = useDispatch();
  const cartKeys = Object.keys(cart);
  if (cartKeys.length === 0) {
    return <></>;
  }
  const totalSum = cartKeys.reduce((sum, key) => {
    const cartItem = cart[key];
    return sum + cartItem.productPrice * cartItem.quantity;
  }, 0);

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
    dispatch(appendQuantity(id));
  };

  return (
    <div>
      <div>
        {cartKeys.map((key) => (
          <CartItem item={cart[key]} key={key} removeCb={removeItem} />
        ))}
      </div>
      <Divider orientation="horizontal" light={false} />
      <div className="total-block">Total cart price: {totalSum} $</div>
    </div>
  );
};

const CartItem = ({ item, removeCb }) => {
  const { productName, productPrice, productId, quantity } = item;
  return (
    <div className="cart-item">
      <span className="cart-item-name flex-item">
        {productName} ({quantity})
      </span>
      <span className="flex-item">{productPrice} $</span>
      <Button
        variant="secondary"
        className="delete-btn"
        onClick={() => removeCb(productId)}
      >
        <DeleteIcon fontSize="inherit" />
      </Button>
    </div>
  );
};

export default CartSummary;
