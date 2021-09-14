import React from 'react';
import { Card, Button } from 'react-bootstrap';
import '../assets/ProductCard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../reducers/shoppingCart';
import { subtractQuantity } from '../../../../reducers/products';

const ProductCard = ({
  productName,
  productImage,
  productId,
  productPrice,
  productQuantity,
  userId,
  seller,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const redirectToDetails = () => {
    history.push(`/product-detail/${productId}`);
  };

  const isOwner = userId === seller.id;
  const inStock = productQuantity > 0;

  const handleAddToCart = () => {
    dispatch(addToCart({ productName, productId, productPrice }));
    dispatch(subtractQuantity(productId));
  };

  return (
    <Card className="card-container">
      <div className="card-img-container">
        <Card.Img variant="top" src={productImage} className="card-img" />
      </div>
      <div className="card-text-block">
        <Card.Title>{productName}</Card.Title>
        <Card.Text>Price: {productPrice}</Card.Text>
        <Card.Text>Available: {productQuantity}</Card.Text>
      </div>
      <div className="btn-container">
        <Button variant="primary" className="btn" onClick={redirectToDetails}>
          Details
        </Button>
        <Button
          variant="secondary"
          className="btn"
          onClick={handleAddToCart}
          disabled={isOwner || !inStock}
        >
          {isOwner
            ? 'You are the seller'
            : inStock
            ? 'Add to cart'
            : 'Out of stock'}
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
