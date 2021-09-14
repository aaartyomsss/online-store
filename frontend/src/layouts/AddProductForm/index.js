import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormGroup from '../../components/FormGroup';
import FormGroupFileUpload from '../../components/FormGroupFileUpload';
import './assets/styles.css';
import { useDispatch } from 'react-redux';
import { addNewProduct } from '../../reducers/products';
import { useHistory } from 'react-router';

const AddProductForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [barcode, setBarcode] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append('name', name);
    data.append('price', price);
    data.append('barcode', barcode);
    data.append('quantity', quantity);
    data.append('description', description);
    data.append('product_image', image);
    dispatch(addNewProduct(data));
    history.push('/');
  };

  return (
    <div className="form-div">
      <Form onSubmit={onSubmit}>
        <FormGroup label="Product name" setValue={setName} />
        <FormGroup
          label="Description"
          setValue={setDescription}
          fieldType="textarea"
          required={true}
        />
        <FormGroup
          label="Price"
          setValue={setPrice}
          fieldType="number"
          required={true}
        />
        <FormGroup
          label="Quantity"
          setValue={setQuantity}
          fieldType="number"
          required={true}
        />
        <FormGroup label="Barcode" setValue={setBarcode} required={true} />
        <FormGroupFileUpload
          accept="image/png, image/jpeg"
          label="Product image"
          required={true}
          setFile={setImage}
          placeholder="Supported formats are: png, jpeg"
        />
        <Button type="submit" className="submit-btn">
          Add product
        </Button>
      </Form>
    </div>
  );
};

export default AddProductForm;
