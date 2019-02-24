const Recommendation = require('../models/Recommendation');
const Disease = require('../models/Disease');

module.exports = {
  addRecommendation: function (req, res) {
    Disease
      .findOne({ name: req.params.id })
      .then(disease => {
        let newRecommendation = {
          userId: req.currentUser._id,
          diseaseId: disease._id,
          content: req.body.content,
          article: req.body.article,
          createdAt: new Date()
        }
        return Recommendation
          .create(newRecommendation)
      })
      .then(recommendation => {
        res.status(201).json(recommendation)
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },
  findAll: function(req, res) {
    Recommendation
      .find({ _id: req.params.id })
      .populate('userId')
      .populate('diseaseId')
      .sort('-createdAt')
      .then(recommendations => {
        res.status(200).json(recommendations)
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  }
}