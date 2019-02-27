const Recommendation = require('../models/Recommendation');
const Disease = require('../models/Disease');
const { youtubeVideos } = require('../helpers/index');

module.exports = {
  addRecommendation: function (req, res) {
    Disease
      .findOne({ _id: req.params.id })
      .then(disease => {
        let newRecommendation = {
          userId: req.currentUser._id,
          diseaseId: disease._id,
          content: req.body.content,
          article: req.body.article,
          imageUrl: req.body.imageUrl,
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
  findAll: async function(req, res) {
    const recommendation = await Recommendation
      .find({ diseaseId: req.params.id })
      .populate('userId')
      .populate('diseaseId')
      .sort('-createdAt')
    let youtube = []
    if (recommendation[0]) {
      youtube = await youtubeVideos(recommendation[0].diseaseId.name)
    } 
    res.status(200).json({ recommendation, youtube: youtube.slice(0, 5)})
  
  },
  findHistoryRecommend: function (req, res) {
    Recommendation
      .find({ userId: req.currentUser._id})
      .populate('userId')
      .populate('diseaseId')
      .sort('-createdAt')
      .then(recommendations => {
        res.status(200).json(recommendations)
      })
      // .catch(err => {
      //   res.status({
      //     message: err.message
      //   })
      // })
  },
  deleteRecommend: function (req, res) {
    Recommendation
      .findOneAndDelete({ _id: req.params.recommendId })
      .then(() => {
        res.status(200).json({
          message: 'Successfully delete recommendation'
        })
      })
      // .catch(err => {
      //   res.status(500).json({
      //     message: err.message
      //   })
      // })
  }
}