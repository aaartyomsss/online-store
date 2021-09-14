import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import CartSummary from './extra/CartSummary';
import './assets/ShoppingCart.css';

const ShoppingCart = () => {
  const [showDetails, setShowDetails] = useState(false);
  const target = useRef(null);
  const cart = useSelector((state) => state.shoppingCartReducer);
  const cartKeys = Object.keys(cart);
  const isEmpty = cartKeys.length === 0;

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Cart summary</Popover.Header>
      <Popover.Body>
        {isEmpty ? 'Your cart is empty' : <CartSummary cart={cart} />}
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
      <Button
        onClick={() => setShowDetails(!showDetails)}
        ref={target}
        className="shopping-cart-btn"
      >
        Shopping cart: {isEmpty ? 'Empty' : `${cartKeys.length} items`}
      </Button>
    </OverlayTrigger>
  );
};

export default ShoppingCart;
