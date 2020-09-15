import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Spin, Row, Col, Typography, Alert } from 'antd';

import { client } from '../App';
import RestaurantCard from './RestaurantCard';

const { Text } = Typography;

const CardsWrapper = styled.div`
  width: 95%;
`;

const Gallery = ({ location }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getRestaurants = async () => {
      setLoading(true);
      const { data } = await client.post('/restaurantsForLocation', {
        lat: location.location.lat,
        lng: location.location.lng,
      });
      setRestaurants(data);
      setLoading(false);
    };
    getRestaurants();
  }, [location]);

  return (
    <>
      <Text>Showing results for {location.address}</Text>
      {loading && <Spin size="large" />}
      {restaurants && (
        <CardsWrapper>
          <Row gutter={[32, 32]}>
            {restaurants.map((restaurant) => (
              <Col span={6} key={restaurant.id}>
                <RestaurantCard
                  currentAddress={location.address}
                  restaurant={restaurant}
                />
              </Col>
            ))}
          </Row>
        </CardsWrapper>
      )}
      {!loading && !restaurants.length && (
        <Alert type="info" message="We coulndn't find any restaurants nerby" />
      )}
    </>
  );
};

Gallery.propTypes = {
  location: PropTypes.shape({
    location: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
    address: PropTypes.string,
  }).isRequired,
};

Gallery.defaultProps = {
  location: {
    location: {
      lat: null,
      lng: null,
    },
    address: '',
  },
};
export default Gallery;
