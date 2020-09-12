import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

export const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const App = () => {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    const getHello = async () => {
      const hello = await client.get('/hello');
      setMessage(hello.data.message);
    };
    getHello();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{message}</p>
      </header>
    </div>
  );
};

export default App;
