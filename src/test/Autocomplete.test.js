import React from 'react';
import { shallow } from 'enzyme';
import Autocomplete from '../components/Autocomplete';

describe('Autocomplete', () => {
  it('renders component', () => {
    const component = shallow(<Autocomplete />);
    expect(component).toMatchSnapshot();
  });
});
