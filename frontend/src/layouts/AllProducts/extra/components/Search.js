import React, { useState, useEffect, useMemo } from 'react';
import '../assets/Search.css';
import { Input } from '@material-ui/core';
import productService from '../../../../services/productService';
import debounce from 'lodash.debounce';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import config from '../../../../config';

const { BASE_URL } = config.CONSTANTS;

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const history = useHistory();

  const pushToDetails = (id) => {
    history.push(`/product-detail/${id}`);
  };

  const onSearch = async (e) => {
    const query = e.target.value;
    if (query.length > 0) {
      const results = await productService.searchForProduct(query);
      setSearchResults(results);
    }
  };

  const debounceHandler = useMemo(() => debounce(onSearch, 300), []);

  useEffect(() => {
    return () => debounceHandler.cancel();
  }, []); // eslint-disable-line

  return (
    <div className="search-div">
      <div className="search-header">
        <h1 className="heading">Search</h1>
        <Button variant="secondary" onClick={() => setSearchResults([])}>
          Clear
        </Button>
      </div>
      <Input
        fullWidth={true}
        placeholder="Type name or barcode"
        onChange={debounceHandler}
      />
      <div>
        {searchResults.map((item) => (
          <SearchItem item={item} toDetailsCb={pushToDetails} key={item.id} />
        ))}
      </div>
    </div>
  );
};

const SearchItem = ({ item, toDetailsCb }) => {
  return (
    <div className="search-item">
      <div className="search-item-column">
        <img
          src={`${BASE_URL}${item.product_image}`}
          className="search-item-img"
          alt="search-item-img"
        />
      </div>
      <div className="text-block search-item-column">
        <div className="item-name">{item.name}</div>
        <div className="item-barcode">{item.barcode}</div>
      </div>
      <div className="search-item-column">
        <Button onClick={() => toDetailsCb(item.id)}>Details</Button>
      </div>
    </div>
  );
};

export default Search;
