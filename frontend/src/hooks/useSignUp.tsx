import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/authContext';

const useSignUp = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { setAccessToken, setRefreshToken } = useContext(AuthContext);
  const navigator = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      name: name,
      username: username,
      address,
      password: password,
    };
    try {
      const response = await axios.post('/api/v1/auth/users/', formData);
      //   router.push('/')
      navigator('/');
    } catch (error) {
      console.log(error);
    }
  };

  return {
    name,
    address,
    username,
    password,
    setUsername,
    setPassword,
    setName,
    setAddress,
    submitForm,
  };
};

export default useSignUp;
