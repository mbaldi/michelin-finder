import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Typography, Divider } from 'antd';

import Autocomplete from './components/Autocomplete';
import Gallery from './components/Gallery';

const API_URL =
  process.env.REACT_APP_API_URL !== '<REACT_APP_API_URL>'
    ? process.env.REACT_APP_API_URL
    : 'http://localhost:1337/api';

export const client = axios.create({
  baseURL: API_URL,
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
`;

const { Title } = Typography;

const App = () => {
  const [location, setLocation] = useState();

  const handleAutoCompleteClick = async (address) => {
    //geocode address
    const { data } = await client.post('/geocode', {
      address,
    });
    setLocation(data);
  };

  return (
    <AppWrapper>
      <Title level={3}>
        Welcome! we will find Michellin-rated restaurants near you
      </Title>
      <Autocomplete
        placeholder="Please type your address or location"
        onClick={handleAutoCompleteClick}
      />
      <Divider />
      {location && <Gallery location={location}></Gallery>}
    </AppWrapper>
  );
};

export default App;
