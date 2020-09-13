/**
 * GeocodeService
 *
 * @description :: Simple service to perform geocoding and reverse geocoding
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 *
 */

const axios = require('axios');

const client = axios.create({
  baseURL: sails.config.custom.GOOGLE_GEOCODE_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
  params: { key: sails.config.custom.GOOGLE_API_KEY, language: 'en' },
});

const getLocation = (geocoded) => {
  const location = {
    status: geocoded.status,
  };
  if (geocoded.status === 'OK') {
    result = geocoded.results[0];
    if (result.geometry.location) {
      location.location = geocoded.results[0].geometry.location;
    }
    if (result.formatted_address) {
      location.address = result.formatted_address;
    }
  }
  return location;
};

module.exports = {
  async geocode(address) {
    const response = await client.get('geocode/json', {
      params: { address },
    });
    if (!response || !response.data) {
      throw new Error('Geocode API Error');
    }
    const { data } = response;
    return getLocation(data);
  },

  async reverseGeocode(lat, lng) {
    const response = await client.get('geocode/json', {
      params: { latlng: `${lat},${lng}` },
    });
    if (!response || !response.data) {
      throw new Error('Geocode API Error');
    }
    const { data } = response;
    return getLocation(data);
  },
};
