/**
 * HelloController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  hello: function (req, res) {
    return res.status(200).send({ message: 'Hello World' });
  },
};
