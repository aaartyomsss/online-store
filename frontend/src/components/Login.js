import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { authorize } from '../services/loginService';
import { useHistory } from 'react-router';
import FormGroup from './FormGroup';
import { showErrorModal } from '../reducers/errorModal';
import { useDispatch } from 'react-redux';
import './assets/Login.css';

const Login = ({ setUserToken, setUserId }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { token, user_id } = await authorize(username, password);
    if (!token) {
      dispatch(showErrorModal('Invalid credentials'));
      return;
    }
    setUserToken(token);
    setUserId(user_id);
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('loggedInUserId', JSON.stringify(user_id));
    history.push('/');
  };

  return (
    <>
      <div className="form-div">
        <Form onSubmit={handleSubmit}>
          <FormGroup setValue={setUsername} label="Username" />
          <FormGroup
            setValue={setPassword}
            fieldType="password"
            label="Password"
          />
          <Button type="submit" className="submit-btn">
            Login
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Login;
