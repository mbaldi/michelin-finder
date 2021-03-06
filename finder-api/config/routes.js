/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  'POST /api/geocode': 'GeocodeController.geocode',
  'POST /api/reverseGeocode': 'GeocodeController.reverseGeocode',
  'POST /api/calculateDistance': 'GeocodeController.calculateDistance',
  'POST /api/restaurantsForLocation':
    'RestaurantController.getRestaurantsForLocation',
};
