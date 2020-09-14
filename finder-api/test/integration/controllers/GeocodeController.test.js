require('../../lifecycle.test');
const supertest = require('supertest');
const sinon = require('sinon');
const assert = require('assert');

describe('GeocodeController', () => {
  describe('geocode', () => {
    before((done) => {
      sinon.stub(sails.services.geocodeservice, 'geocode').returns({
        status: 'OK',
        address: '1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA',
        location: {
          lat: 37.42198430000001,
          lng: -122.0840786,
        },
      });
      done();
    });

    after(() => {
      sails.services.geocodeservice.geocode.restore();
    });

    it('should return 400 if no address', (done) => {
      supertest(sails.hooks.http.app)
        .post('/api/geocode')
        .send({})
        .expect(400, done);
    });

    it('should return lat lng for address', (done) => {
      supertest(sails.hooks.http.app)
        .post('/api/geocode')
        .send({
          address: '1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA',
        })
        .expect(200, (err, res) => {
          if (err) {
            sails.log.error(err);
            return done(err);
          }
          const response = res.body;
          assert(response.status === 'OK');
          assert(response.location.lat === 37.42198430000001);
          assert(response.location.lng === -122.0840786);
          return done();
        });
    });
  });

  describe('reverseGeocode', () => {
    before((done) => {
      sinon.stub(sails.services.geocodeservice, 'reverseGeocode').returns({
        status: 'OK',
        address: '1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA',
        location: {
          lat: 37.42198430000001,
          lng: -122.0840786,
        },
      });
      done();
    });

    after(() => {
      sails.services.geocodeservice.reverseGeocode.restore();
    });

    it('should return 400 if no lat lng', (done) => {
      supertest(sails.hooks.http.app)
        .post('/api/reverseGeocode')
        .send({})
        .expect(400, done);
    });
    it('should return address for lat lng ', (done) => {
      supertest(sails.hooks.http.app)
        .post('/api/reverseGeocode')
        .send({ lat: 37.421, lng: -122.084 })
        .expect(200, (err, res) => {
          if (err) {
            sails.log.error(err);
            return done(err);
          }
          const response = res.body;
          assert(response.status === 'OK');
          assert(
            response.address ===
              '1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA'
          );

          return done();
        });
    });
  });

  describe('calculateDistance', () => {
    before((done) => {
      sinon.stub(sails.services.geocodeservice, 'getDistance').returns({
        distance: 24.4,
        unit: 'miles',
      });
      done();
    });

    after(() => {
      sails.services.geocodeservice.getDistance.restore();
    });

    it('should return 400 if no destination', (done) => {
      supertest(sails.hooks.http.app)
        .post('/api/calculateDistance')
        .send({ source: { lat: 37.421, lng: -122.084 } })
        .expect(400, done);
    });
    it('should return distance for destinations', (done) => {
      supertest(sails.hooks.http.app)
        .post('/api/calculateDistance')
        .send({
          source: { lat: 37.421, lng: -122.084 },
          destinations: [{ id: 1, lat: 38.421, lng: -117.084 }],
        })
        .expect(200, (err, res) => {
          if (err) {
            sails.log.error(err);
            return done(err);
          }
          const response = res.body;
          assert(response.distances.length === 1);
          assert(response.distances[0].id === 1);
          assert(response.distances[0].lat === 38.421);
          assert(response.distances[0].lng === -117.084);
          assert(response.distances[0].distance === 24.4);
          return done();
        });
    });
  });
});
