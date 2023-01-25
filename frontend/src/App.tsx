import { useContext, useEffect, useState } from 'react';
import './App.css';
import { AppRouter } from './components/AppRouter';
import { QueryClient, QueryClientProvider } from 'react-query';
import Navbar from './components/Navigation/Navbar';
import AuthContext, { AuthContextProvider } from './context/authContext';
import { useAuth } from './hooks/useAuth';

function App() {
  const queryClient = new QueryClient();
  const auth = useAuth();

  const { setUsername, accessToken } = useContext(AuthContext);

  useEffect(() => {
    const callback = async () => {
      await setUsername();
    };

    callback();
  }, [accessToken]);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <AppRouter />
      </QueryClientProvider>
    </div>
  );
}

export default App;
