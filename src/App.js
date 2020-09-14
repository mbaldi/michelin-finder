import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Typography } from 'antd';
import Autocomplete from './components/Autocomplete';

export const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const AppWrapper = styled.div`
  text-align: center;
  background-color: #fcfbfc;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
`;

const { Title } = Typography;

const App = () => {
  // const [message, setMessage] = useState('Loading...');

  // useEffect(() => {
  //   const getHello = async () => {
  //     const hello = await client.get('/hello');
  //     setMessage(hello.data.message);
  //   };
  //   getHello();
  // }, []);

  return (
    <AppWrapper>
      <Title level={3}>
        Welcome! we will find Michellin-rated restaurants near you
      </Title>
      <Autocomplete
        placeholder="Please type your address"
        onClick={(address) => console.log(address)}
      />
    </AppWrapper>
  );
};

export default App;
