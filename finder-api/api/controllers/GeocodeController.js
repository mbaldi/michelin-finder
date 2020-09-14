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

  calculateDistance(req, res) {
    const { source, destinations } = req.body;
    if (
      !source ||
      !source.lat ||
      !source.lng ||
      !destinations ||
      !Array.isArray(destinations) ||
      destinations.length < 1
    ) {
      return res.status(400).send();
    }
    try {
      const distances = destinations.map((destination) => {
        return {
          ...destination,
          ...GeocodeService.getDistance(
            source.lat,
            source.lng,
            destination.lat,
            destination.lng
          ),
        };
      });
      return res.status(200).send({
        source,
        distances,
      });
    } catch (e) {
      sails.log.error(e);
      return e;
    }
  },
};
