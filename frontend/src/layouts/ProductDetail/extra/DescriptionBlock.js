import React from 'react';
import { Button } from 'react-bootstrap';
import '../assets/ProductDetail.css';

const DescriptionBlock = ({
  product,
  handleAddToCart,
  isOwner,
  inStock,
  setShowModal,
  children,
}) => {
  return (
    <>
      <div className="title">{product.name}</div>
      <div className="description-section">
        <div className="description">Description</div>
        <div>{product.description}</div>
      </div>
      <div className="description-section">
        <div className="description-text">Price: {product.price} $</div>
        <div>In stock: {product.quantity}</div>
      </div>
      <div className="description-section">
        <div>Seller: {product.seller.username}</div>
      </div>
      <div className="btn-block">
        <Button
          onClick={handleAddToCart}
          disabled={isOwner || !inStock}
          className="description-btn miss-aligned"
        >
          {isOwner
            ? 'You are the owner'
            : inStock
            ? 'Add to cart'
            : 'Out of stock'}
        </Button>
        {isOwner && (
          <Button
            variant="danger"
            onClick={() => setShowModal(true)}
            className="description-btn"
            id="delete-btn"
          >
            Delete item
          </Button>
        )}
        {isOwner && children}
      </div>
    </>
  );
};

export default DescriptionBlock;
