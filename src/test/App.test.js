import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe('App', () => {
  beforeEach(() => {
    global.google = {
      maps: {
        places: {
          Autocomplete: jest.fn().mockImplementation(() => {
            const setFields = jest.fn();
            const addListener = jest.fn();
            return { setFields, addListener };
          }),
        },
      },
    };
  });

  it('renders component', () => {
    const app = shallow(<App />);
    expect(app).toMatchSnapshot();
  });
});
