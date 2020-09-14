import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 400px;
  height: 32px;
  border-radius: 2px;
  outline: none;
  border: 0px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.1);
`;

const Autocomplete = ({ placeholder, onClick }) => {
  let autocomplete;
  const inputRef = useRef(null);
  const [address, setAddress] = useState('');
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps, no-undef
    autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      fields: ['formatted_address'],
    });
    autocomplete.addListener('place_changed', handlePlaceChanged);
  }, []);

  const handlePlaceChanged = () => {
    let place;
    try {
      place = autocomplete.getPlace();
    } catch (error) {
      console.log(error);
    }
    if (place) {
      setAddress(place.formatted_address || '');
    }
  };

  return (
    <div>
      <StyledInput
        id="autocomplete"
        placeholder={placeholder}
        ref={inputRef}
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Button
        type="primary"
        disabled={!address}
        onClick={() => onClick(address)}
      >
        Go
      </Button>
    </div>
  );
};

Autocomplete.propTypes = {
  placeholder: PropTypes.string,
  onClick: PropTypes.func,
};

Autocomplete.defaultProps = {
  placeholder: '',
  onClick: () => {},
};

export default Autocomplete;
