const Disease = require('../models/Disease');

module.exports = {
  findAll: function (req, res) {
    Disease
      .find(req.body.diseases)
      .then(diseases => {
        res.status(200).json(diseases)
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  }
}