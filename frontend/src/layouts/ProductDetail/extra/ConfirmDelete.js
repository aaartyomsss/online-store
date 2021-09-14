import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmDelete = ({ showModal, setShowModal, handleDeleteProduct }) => {
  return (
    <Modal show={showModal}>
      <Modal.Header>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>This item will be deleted forever</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDeleteProduct}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDelete;
