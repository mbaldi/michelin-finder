/**
 * RestaurantController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const fs = require('fs').promises;
const path = require('path');
const DATA_FILE = path.join(__dirname, '..', '..', 'data', 'restaurants.json');

module.exports = {
  async getRestaurants(req, res) {
    try {
      const data = await fs.readFile(DATA_FILE, 'UTF-8');
      return res.status(200).type('json').send(data);
    } catch (e) {
      sails.log.error(e);
      return res.serverError({ error: e.message });
    }
  },
};
