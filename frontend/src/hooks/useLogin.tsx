import axios from 'axios';
import React, { useContext, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import AuthContext from '../context/authContext';

const useLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { setAccessToken, setRefreshToken } = useContext(AuthContext);
  const navigator = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    axios.defaults.headers.common['Authorization'] = '';
    localStorage.removeItem('access_token');
    const formData = {
      username: username,
      password: password,
    };
    try {
      const response = await axios.post('/api/v1/auth/jwt/create/', formData);
      console.log(response);
      const access_token = response.data.access;
      const refresh_token = response.data.refresh;

      setAccessToken(access_token);
      setRefreshToken(refresh_token);

      axios.defaults.headers.common['Authorization'] = `JWT ${access_token}`;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      //   router.push('/')
      navigator('/');
    } catch (error) {
      console.log(error);
    }
  };

  return {
    username,
    password,
    setUsername,
    setPassword,
    submitForm,
  };
};

export default useLogin;
