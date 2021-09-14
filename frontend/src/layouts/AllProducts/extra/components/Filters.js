import React from 'react';
import { Button } from 'react-bootstrap';
import '../assets/Filters.css';

const Filters = ({ setDescendingFirst, setFilterBy }) => {
  const handleFilterSelection = (decending, param) => {
    setDescendingFirst(decending);
    setFilterBy(param);
  };

  return (
    <div className="filters-panel">
      <Button
        onClick={() => handleFilterSelection(true, 'price')}
        variant="light"
        id="miss-aligned"
        className="filter-btn"
      >
        Expensive first
      </Button>
      <Button
        onClick={() => handleFilterSelection(false, 'price')}
        variant="light"
        className="filter-btn"
      >
        Cheap first
      </Button>
      <Button
        onClick={() => handleFilterSelection(true, 'quantity')}
        variant="light"
        className="filter-btn"
      >
        Most available
      </Button>
      <Button
        onClick={() => handleFilterSelection(false, 'quantity')}
        variant="light"
        className="filter-btn"
      >
        Least available
      </Button>
    </div>
  );
};

export default Filters;
