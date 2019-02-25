const History = require('../models/History');
const Label = require('../models/Label');
const Disease = require('../models/Disease');
const axios = require('axios');
const FormData = require('form-data');


module.exports = {
  addHistory: async function (req, res) {
    try {
      let newHistory = {...req.body};
      let formData = new FormData()
      formData.append('url', req.body.image)
      const { data } = await axios({
        method: 'POST',
        url: 'http://35.186.151.40/predict',
        data: formData,
        headers: formData.getHeaders()
      })
      const dataLabel = await Label.findOne( {rawLabel: data.result} )
      
      newHistory.labelId = dataLabel._id;
      newHistory.userId = req.currentUser._id;
      const history = await History.create(newHistory)
      res.status(201).json(history)
    } catch (error) {
      // res.status(500).json(error)
    }
  },
  getHistory: function (req, res) {
    History
      .find({ userId: req.currentUser._id })
      .populate('userId')
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
  },
  deleteHistory: function (req, res) {
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
  },
  findOne: function (req, res) {
    History
      .findOne({ _id: req.params.id })
      .populate('userId')
      .populate('labelId')
      .then(history => {
        res.status(200).json(history)
      })
      // .catch(err => {
      //   res.status(500).json({
      //     message: err.message
      //   })
      // })
  }
}