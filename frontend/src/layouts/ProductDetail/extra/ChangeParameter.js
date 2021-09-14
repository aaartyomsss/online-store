import React, { useRef, useState } from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { Select, MenuItem } from '@material-ui/core';
import FormGroup from '../../../components/FormGroup';
import FormGroupFileUpload from '../../../components/FormGroupFileUpload';
import '../assets/ProductDetail.css';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../../../reducers/products';

const PROPERTIES = {
  barcode: 'barcode',
  quantity: 'quantity',
  name: 'name',
  price: 'price',
  description: 'description',
  product_image: 'product image',
};

const OPTION_KEYS = Object.keys(PROPERTIES);

const ChangeParameter = ({ productId }) => {
  const dispatch = useDispatch();

  const target = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(OPTION_KEYS[0]);
  const [newValue, setNewValue] = useState('');
  const [image, setImage] = useState(null);

  const handleChange = () => {
    let data = new FormData();
    const toChange = selectedProperty === 'product_image' ? image : newValue;
    data.append(selectedProperty, toChange);
    dispatch(updateProduct(productId, data));
    setNewValue('');
    setImage(null);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Cart summary</Popover.Header>
      <Popover.Body>
        <div>
          <Select
            onChange={({ target }) => setSelectedProperty(target.value)}
            defaultValue={selectedProperty}
            value={selectedProperty}
            className="select"
          >
            {OPTION_KEYS.map((key) => (
              <MenuItem key={key} value={key}>
                {PROPERTIES[key]}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="input">
          {selectedProperty === 'product_image' ? (
            <FormGroupFileUpload
              setFile={setImage}
              customClass={'form-group-change-detail'}
            />
          ) : (
            <FormGroup
              setValue={setNewValue}
              customClass={'form-group-change-detail'}
            />
          )}
        </div>
        <div>
          <Button onClick={handleChange}>Change</Button>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
      <Button
        variant="warning"
        onClick={() => setShowForm(!showForm)}
        ref={target}
      >
        Change details
      </Button>
    </OverlayTrigger>
  );
};

export default ChangeParameter;
