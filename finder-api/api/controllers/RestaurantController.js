/**
 * RestaurantController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const path = require('path');
const restaurants = require(path.join(
  __dirname,
  '..',
  '..',
  'data',
  'restaurants.json'
));

MAX_DISTANCE_MILES = 50;

module.exports = {
  async getRestaurantsForLocation(req, res) {
    const { lat, lng } = req.body;
    if (!lat || !lng) {
      return res.status(400).send();
    }
    try {
      const results = restaurants.reduce((acc, r) => {
        if (r.lat && r.lng) {
          const distance = GeocodeService.getDistance(lat, lng, r.lat, r.lng);
          if (distance.distance <= MAX_DISTANCE_MILES) {
            acc.push({ ...r, ...distance });
          }
        }
        return acc;
      }, []);
      results.sort((r1, r2) => r1.distance - r2.distance);
      return res.status(200).send(results);
    } catch (e) {
      sails.log.error(e);
      return res.serverError({ error: e.message });
    }
  },
};
