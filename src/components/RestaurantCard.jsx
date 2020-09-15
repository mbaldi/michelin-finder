import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Spin, Card, Image, Typography, Space, Button } from 'antd';
import {
  StarOutlined,
  EnvironmentOutlined,
  CarOutlined,
} from '@ant-design/icons';

import { client } from '../App';

const { Meta } = Card;
const { Text, Title } = Typography;

const Gallery = ({ currentAddress, restaurant }) => {
  const [restaurantAddress, setRestaurantAddress] = useState();
  const [loading, setLoading] = useState(false);

  const handleGetAddress = async (id, lat, lng) => {
    //reverse geocode address
    setLoading(true);
    const { data } = await client.post('/reverseGeocode', {
      lat,
      lng,
    });
    if (data && data.status === 'OK') {
      setRestaurantAddress(data.address);
    }
    setLoading(false);
  };

  const getStars = (rating) => {
    const reps = parseInt(rating, 10);
    return [...Array(reps)].map((e, i) => <StarOutlined key={i} />);
  };

  const openDirections = (origin, destination) => {
    const url = encodeURI(
      `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`
    );
    window.open(url, '_blank');
  };

  return (
    <Card
      cover={
        <Image
          alt={restaurant.name}
          src={restaurant.img}
          height={300}
          placeholder={<Spin size="large" />}
        />
      }
    >
      <Meta
        avatar={
          <Space direction="vertical" size={0}>
            <div>{getStars(restaurant.rating)}</div>
            <Title level={3}>{restaurant.distance}</Title>
            <Text>Miles away</Text>
          </Space>
        }
        title={
          <Button
            type="text"
            size="middle"
            onClick={() => window.open(restaurant.link, '_blank')}
          >
            <Text strong>{restaurant.name}</Text>
          </Button>
        }
        description={
          <Space direction="vertical" size={0}>
            <Text type="secondary">{restaurant.type.split(',')[0]}</Text>
            <Text>{restaurant.location}</Text>
            {!restaurantAddress && (
              <Button
                loading={loading}
                type="primary"
                icon={<EnvironmentOutlined />}
                onClick={() => {
                  handleGetAddress(
                    restaurant.id,
                    restaurant.lat,
                    restaurant.lng
                  );
                }}
              >
                Get address
              </Button>
            )}
            {!!restaurantAddress && (
              <>
                <Text code copyable>
                  {restaurantAddress}
                </Text>
                <Button
                  icon={<CarOutlined />}
                  onClick={() => {
                    openDirections(currentAddress, restaurantAddress);
                  }}
                >
                  Open driving directions
                </Button>
              </>
            )}
          </Space>
        }
      />
    </Card>
  );
};

Gallery.propTypes = {
  currentAddress: PropTypes.string.isRequired,
  restaurant: PropTypes.instanceOf(Object).isRequired,
};

Gallery.defaultProps = {
  currentAddress: '',
  restaurant: null,
};
export default Gallery;
