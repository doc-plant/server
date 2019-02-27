const History = require('../models/History');
const Label = require('../models/Label');
const Recommendations = require('../models/Recommendation');
const axios = require('axios');
const qs = require('querystring')
const { youtubeVideos } = require('../helpers')


class HistoryController {
  static async addHistory (req, res) {
    try {
      let newHistory = {...req.body};
      const url = req.body.image;
      const { data } = await axios.post('http://35.186.151.40/predict',
        qs.stringify({url: url})
      )
      if (data.result == 'background') {
        res.status(200).json({
          message: 'Error Image'
        })
      } else {
        const dataLabel = await Label.findOne( {rawLabel: data.result} )
        newHistory.labelId = dataLabel._id;
        newHistory.userId = req.currentUser._id;
        const history = await History.create(newHistory);
        req.params.id = history._id
        HistoryController.findOne(req, res)
      }
      // res.status(201).json(history)
    } catch (error) {
      // res.status(500).json(error)
    }
  }
  static getHistory (req, res) {
    History
      .find({ userId: req.currentUser._id })
      .populate('labelId')
      .sort('-createdAt')
      .then(histories => {
        res.status(200).json(histories)
      })
      // .catch(err => {
      //   res.status(500).json({
      //     message: err.message
      //   })
      // })
  }
  static deleteHistory (req, res) {
    History
      .findOneAndDelete({ _id: req.params.id })
      .then(() => {
        res.status(200).json({
          message: 'History deleted!'
        })
      })
      // .catch(err => {
      //   res.status(500).json({
      //     message: err.message
      //   })
      // })
  }
  static async findOne (req, res) {
    const history = await History
      .findOne({ _id: req.params.id })
      .populate('userId')
      .populate({path: 'labelId', populate: {path: 'diseaseId'}})
    const recommend = await Recommendations
                              .find({
                                diseaseId: history.labelId.diseaseId
                              })
                              .populate('userId')
    const youtube = await youtubeVideos(history.labelId.diseaseId.name)
    res.status(200).json({history, recommend, youtube: youtube.slice(0, 5)})
      // .catch(err => {
      //   res.status(500).json({
      //     message: err.message
      //   })
      // })
  }
}
module.exports = HistoryController