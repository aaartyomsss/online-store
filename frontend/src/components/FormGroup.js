import React from 'react';
import { Form } from 'react-bootstrap';
import './assets/FormGroup.css';

const FormGroup = ({
  label,
  setValue,
  fieldType,
  required,
  customClass = '',
}) => {
  return (
    <Form.Group className={`form-group ${customClass}`}>
      <Form.Label className="form-label">{label}</Form.Label>
      <Form.Control
        onChange={(e) => setValue(extractValue(e))}
        type={fieldType ? fieldType : 'text'}
        required={!!required}
      />
    </Form.Group>
  );
};

const extractValue = (e) => {
  return e.target.value;
};

export default FormGroup;
