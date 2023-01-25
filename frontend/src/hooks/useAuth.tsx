import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/authContext';

export const useAuth = () => {
  const { setAccessToken, initialize, user, setUsername } =
    useContext(AuthContext);

  const accessToken = localStorage.getItem('access_token') || '';
  const refreshToken = localStorage.getItem('refresh_token') || '';

  const getAccess = async () => {
    const accessData = {
      refresh: refreshToken,
    };

    try {
      const response = await axios.post(
        '/api/v1/auth/jwt/refresh/',
        accessData
      );
      const access = await response.data.access;
      localStorage.setItem('access_token', access);
      setAccessToken(access);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initialize();

    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `JWT ${accessToken}`;
    } else {
      axios.defaults.headers.common['Authorization'] = '';
    }

    setInterval(async () => {
      getAccess();
    }, 59000);
  }, []);

  return {
    accessToken,
    refreshToken,
    user,
    initialize,
    // setAccessToken,
    // setRefreshTo
  };
};
