import React from 'react';
import { shallow } from 'enzyme';
import RestaurantCard from '../components/RestaurantCard';

describe('Gallery', () => {
  it('renders component', () => {
    const currentAddress =
      '1600 Pennsylvania Avenue NW #0, Washington, DC 20500, USA';
    const restaurant = {
      id: 94,
      rating: '3',
      year: 'MICHELIN Guide California 2019',
      img:
        'https://axwwgrkdco.cloudimg.io/v7/mtp-cf-images.s3-eu-west-1.amazonaws.com/images/max/27d17f3c-82ab-4ddc-b3cb-181b03bd0d68.jpg?width=500&amp;sharp=1',
      name: 'The French Laundry',
      link:
        'https://guide.michelin.com//en/california/yountville/restaurant/the-french-laundry',
      location: 'Yountville',
      type: 'Contemporary, Contemporary',
      lat: 38.40443,
      lng: -122.364738,
      distance: 45.39,
      units: 'miles',
    };
    const card = shallow(
      <RestaurantCard currentAddress={currentAddress} restaurant={restaurant} />
    );
    expect(card).toMatchSnapshot();
  });
});
