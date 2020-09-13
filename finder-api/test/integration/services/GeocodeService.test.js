/* eslint-disable camelcase */
require('../../lifecycle.test');
const assert = require('assert');

describe('GeocodeService', () => {
  const googleGeocoded = {
    results: [
      {
        address_components: [
          {
            long_name: '1600',
            short_name: '1600',
            types: ['street_number'],
          },
          {
            long_name: 'Amphitheatre Parkway',
            short_name: 'Amphitheatre Pkwy',
            types: ['route'],
          },
          {
            long_name: 'Mountain View',
            short_name: 'Mountain View',
            types: ['locality', 'political'],
          },
          {
            long_name: 'Santa Clara County',
            short_name: 'Santa Clara County',
            types: ['administrative_area_level_2', 'political'],
          },
          {
            long_name: 'California',
            short_name: 'CA',
            types: ['administrative_area_level_1', 'political'],
          },
          {
            long_name: 'United States',
            short_name: 'US',
            types: ['country', 'political'],
          },
          {
            long_name: '94043',
            short_name: '94043',
            types: ['postal_code'],
          },
        ],
        formatted_address:
          '1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA',
        geometry: {
          location: {
            lat: 37.42198430000001,
            lng: -122.0840786,
          },
          location_type: 'ROOFTOP',
          viewport: {
            northeast: {
              lat: 37.42333328029151,
              lng: -122.0827296197085,
            },
            southwest: {
              lat: 37.42063531970851,
              lng: -122.0854275802915,
            },
          },
        },
        place_id: 'ChIJVYBZP-Oxj4ARls-qJ_G3tgM',
        plus_code: {
          compound_code: 'CWC8+Q9 Mountain View, CA, USA',
          global_code: '849VCWC8+Q9',
        },
        types: ['street_address'],
      },
    ],
    status: 'OK',
  };

  describe('getLocation', () => {
    it('returns location', (done) => {
      const result = sails.services.geocodeservice.getLocation(googleGeocoded);
      assert(result.status === 'OK');
      assert(result.location.lat === 37.42198430000001);
      assert(result.location.lng === -122.0840786);
      assert(
        result.address ===
          '1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA'
      );
      return done();
    });
  });
  describe('calculateDistanceinMiles', () => {
    it('returns distance in miles', (done) => {
      const result = sails.services.geocodeservice.calculateDistanceinMiles(
        38.8977,
        -77.0365,
        38.8769,
        -77.0708
      );
      assert(result === 2.34);
      return done();
    });
  });
});
