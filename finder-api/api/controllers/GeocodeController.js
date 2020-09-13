/**
 * GeocodeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async geocode(req, res) {
    const { address } = req.body;
    if (!address) {
      return res.status(400).send();
    }
    try {
      const response = await GeocodeService.geocode(address);
      return res.status(200).send(response);
    } catch (e) {
      sails.log.error(e);
      return e;
    }
  },

  async reverseGeocode(req, res) {
    const { lat, lng } = req.body;
    if (!lat || !lng) {
      return res.status(400).send();
    }
    try {
      const response = await GeocodeService.reverseGeocode(lat, lng);
      return res.status(200).send(response);
    } catch (e) {
      sails.log.error(e);
      return e;
    }
  },
};
