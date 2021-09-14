import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { closeErrorModal } from '../reducers/errorModal';

const ErrorModal = () => {
  const modalState = useSelector((state) => state.errorModalReducer);
  const dispatch = useDispatch();

  return (
    <Modal show={modalState.show}>
      <Modal.Header>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{modalState.errorText}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(closeErrorModal())}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
