import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { addToCart } from '../../reducers/shoppingCart';
import {
  getAllProducts,
  subtractQuantity,
  deleteProduct,
} from '../../reducers/products';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import productService from '../../services/productService';
import DescriptionBlock from './extra/DescriptionBlock';
import ConfirmDelete from './extra/ConfirmDelete';
import ChangeParameter from './extra/ChangeParameter';
import './assets/ProductDetail.css';
import config from '../../config';

const { BASE_URL } = config.CONSTANTS;

const ProductDetail = ({ userId }) => {
  const { productId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const products = useSelector((state) => state.productsReducer);
  const product = products.filter(
    (product) => product.id === parseInt(productId)
  )[0];

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getAllProducts());
    }
  }, []); //eslint-disable-line

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productName: product.name,
        productPrice: product.price,
        productId: product.id,
      })
    );
    dispatch(subtractQuantity(product.id));
  };

  const handleDeleteProduct = async () => {
    const response = await productService.deleteProduct(product.id);
    if (!response.ok) {
      return console.error('Smth went wrong');
    }
    setShowModal(false);
    dispatch(deleteProduct(product.id));
    history.push('/');
  };

  const isOwner = userId === product?.seller.id;
  const inStock = product?.quantity > 0;

  if (!product) {
    return (
      <div className="spinner">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <div className="parent-container">
        <div className="img-container">
          <img
            src={`${BASE_URL}${product.product_image}`}
            className="product-img"
            alt={product.name}
          />
        </div>
        <div className="description-container">
          <DescriptionBlock
            {...{
              product,
              isOwner,
              inStock,
              setShowModal,
              handleAddToCart,
            }}
          >
            <ChangeParameter productId={productId} />
          </DescriptionBlock>
        </div>
      </div>
      <ConfirmDelete {...{ setShowModal, showModal, handleDeleteProduct }} />
    </>
  );
};

export default ProductDetail;
