import React from 'react';
import { Form } from 'react-bootstrap';
import './assets/FormGroup.css';

const FormGroupFileUpload = ({
  label,
  setFile,
  required,
  accept,
  placeholder,
  customClass = '',
}) => {
  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Form.Group className={`form-group ${customClass}`}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="file"
        required={!!required}
        accept={accept ? accept : 'image/jpeg'}
        onChange={handleUpload}
        placeholder={placeholder}
      />
    </Form.Group>
  );
};

export default FormGroupFileUpload;
