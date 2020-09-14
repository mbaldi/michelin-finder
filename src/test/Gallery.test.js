import React from 'react';
import { shallow } from 'enzyme';
import Gallery from '../components/Gallery';

describe('Gallery', () => {
  it('renders component', () => {
    const location = {
      status: 'OK',
      location: {
        lat: 38.8976633,
        lng: -77.0365739,
      },
      address: '1600 Pennsylvania Avenue NW #0, Washington, DC 20500, USA',
    };
    const component = shallow(<Gallery location={location} />);
    expect(component).toMatchSnapshot();
  });
});
