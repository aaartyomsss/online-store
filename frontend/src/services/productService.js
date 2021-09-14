import config from '../config';
const BASE_URL = `${config.CONSTANTS.BASE_URL}/api`;

const fetchData = async (url) => {
  const responseJson = await fetch(url);
  const data = await responseJson.json();
  return data;
};

const getAllProducts = async () => {
  const data = await fetchData(`${BASE_URL}/all-products/`);
  return data;
};

const getProductDetails = async (productId) => {
  const data = await fetchData(`${BASE_URL}/product-detail/${productId}`);
  return data;
};

const searchForProduct = async (query) => {
  const response = await fetch(`${BASE_URL}/products/search/${query}/`);
  return await response.json();
};

const addProduct = async (data) => {
  const token = window.localStorage.getItem('token');
  if (!token) {
    return false;
  }
  const params = {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
    },
    body: data,
  };
  const response = await fetch(`${BASE_URL}/add-product/`, params);
  if (!response.ok) {
    console.error('Somethin went wrong');
    return;
  }
  const new_product = await response.json();
  return new_product;
};

const deleteProduct = async (id) => {
  const token = window.localStorage.getItem('token');
  if (!token) {
    return false;
  }
  const params = {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  const response = await fetch(`${BASE_URL}/delete-product/${id}/`, params);
  return response;
};

const updateProduct = async (id, data) => {
  const token = window.localStorage.getItem('token');
  if (!token) {
    return false;
  }
  const params = {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
    },
    body: data,
  };
  const response = await fetch(`${BASE_URL}/update-product/${id}/`, params);
  if (!response.ok) {
    return false;
  }
  return await response.json();
};

const productService = {
  getAllProducts,
  getProductDetails,
  addProduct,
  searchForProduct,
  deleteProduct,
  updateProduct,
};

export default productService;
