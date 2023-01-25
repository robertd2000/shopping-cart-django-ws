import axios from 'axios';
import React, { createContext, FC, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

interface IProps {
  children: React.ReactNode;
}

const AuthContext = createContext<{
  accessToken: string;
  refreshToken: string;
  user: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);

export const AuthContextProvider: FC<IProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [user, setUser] = useState({
    name: '',
    id: 0,
  });

  const initialize = () => {
    if (localStorage.getItem('access_token')) {
      setAccessToken(localStorage.getItem('access_token')!);
      setRefreshToken(localStorage.getItem('refresh_token')!);
    } else {
      setAccessToken('');
      setRefreshToken('');
    }
  };

  const setUsername = async () => {
    try {
      const response = await axios.get('/api/v1/auth/users/me');
      console.log(response.data.username);
      setUser({
        name: response.data.username,
        id: response.data.id,
      });
    } catch (error) {
      console.log('auth user');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        user,
        initialize,
        setUsername,
        setAccessToken,
        setRefreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
