const Plant = require('../models/Plant');

module.exports = {
  findAll: async function (req, res) {
    try {
      const data = await Plant.find({}).populate('diseases')
      res.status(200).json(data)
    } catch (error) {
      // res.status(500).json(error)
    }
  }
}