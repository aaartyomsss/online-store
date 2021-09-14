import React, { useState } from 'react';
import ProductCard from './extra/components/ProductCard';
import './extra/assets/AllProducts.css';
import { useSelector } from 'react-redux';
import Search from './extra/components/Search';
import filters from './extra/functions/filters';
import Filters from './extra/components/Filters';
import config from '../../config';
const { BASE_URL } = config.CONSTANTS;

const AllProducts = ({ userId }) => {
  let products = useSelector((state) => state.productsReducer);
  const [descendingFirst, setDescendingFirst] = useState(true);
  const [filterBy, setFilterBy] = useState('price');
  if (descendingFirst) {
    products = filters.decending(products, filterBy);
  } else {
    products = filters.ascending(products, filterBy);
  }

  return (
    <div className="products-layout">
      <Search />
      <div>
        <Filters {...{ setFilterBy, setDescendingFirst, userId }} />
        <div className="product-tile">
          {products.length > 0 &&
            products.map((product) => (
              <ProductCard
                productName={product.name}
                productImage={`${BASE_URL}${product.product_image}`}
                productId={product.id}
                productPrice={product.price}
                key={product.id}
                productQuantity={product.quantity}
                userId={userId}
                seller={product.seller}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
