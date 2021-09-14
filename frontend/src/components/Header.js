import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './assets/Header.css';
import ShoppingCart from '../layouts/ShoppingCart';

const Header = ({ userToken, setUserId, setUserToken }) => {
  const handleLogout = () => {
    setUserId(null);
    setUserToken(null);
    window.localStorage.clear();
  };

  return (
    <Nav className="nav-bar">
      <div className="nav-links">
        <Nav.Item className="nav-item">
          <Link to="/" className="nav-link">
            All Products
          </Link>
        </Nav.Item>
        <Nav.Item className="nav-item">
          {userToken ? (
            <Link to="/add-product" className="nav-link">
              Add Product
            </Link>
          ) : null}
        </Nav.Item>
        <Nav.Item className="nav-item">
          {userToken ? null : (
            <Link to="/login" className="nav-link">
              Login
            </Link>
          )}
        </Nav.Item>
      </div>
      <div className="nav-links">
        <Nav.Item className="nav-button shopping-cart">
          <ShoppingCart />
        </Nav.Item>
        {userToken ? (
          <Nav.Item className="nav-button">
            <Button className="nav-button-text" onClick={handleLogout}>
              Logout
            </Button>
          </Nav.Item>
        ) : null}
      </div>
    </Nav>
  );
};

export default Header;
