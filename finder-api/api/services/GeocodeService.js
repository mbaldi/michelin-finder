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

module.exports = {
  getLocation(geocoded) {
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
  },

  calculateDistanceinMiles(lat1, lng1, lat2, lng2) {
    rlat1 = (lat1 * Math.PI) / 180;
    rlng1 = (lng1 * Math.PI) / 180;
    rlat2 = (lat2 * Math.PI) / 180;
    rlng2 = (lng2 * Math.PI) / 180;

    const distance =
      3959 *
      Math.acos(
        Math.sin(rlat1) * Math.sin(rlat2) +
          Math.cos(rlat1) * Math.cos(rlat2) * Math.cos(rlng1 - rlng2)
      );

    return parseFloat(distance.toFixed(2));
  },

  async geocode(address) {
    const response = await client.get('geocode/json', {
      params: { address },
    });
    if (!response || !response.data) {
      throw new Error('Geocode API Error');
    }
    const { data } = response;
    return this.getLocation(data);
  },

  async reverseGeocode(lat, lng) {
    const response = await client.get('geocode/json', {
      params: { latlng: `${lat},${lng}` },
    });
    if (!response || !response.data) {
      throw new Error('Geocode API Error');
    }
    const { data } = response;
    return this.getLocation(data);
  },

  getDistance(lat1, lng1, lat2, lng2) {
    return {
      distance: this.calculateDistanceinMiles(
        parseFloat(lat1),
        parseFloat(lng1),
        parseFloat(lat2),
        parseFloat(lng2)
      ),
      units: 'miles',
    };
  },
};
