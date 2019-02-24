const History = require('../models/History');
const Label = require('../models/Label');
const Disease = require('../models/Disease');
const axios = require('axios');
const FormData = require('form-data');


module.exports = {
  addHistory: async function (req, res) {
    try {
      // let newHistory = {...req.body};
      // newHistory.userId = req.currentUser._id;
      let formData = new FormData()
      formData.append('url', 'https://firebasestorage.googleapis.com/v0/b/docplant-f7bfd.appspot.com/o/images%2F1550931449247?alt=media&token=f3db86bc-e64c-4b70-be3c-906a2e515b72')
      const { data } = await axios({
        method: 'POST',
        url: 'http://35.186.151.40/predict',
        data: formData,
        headers: formData.getHeaders()
      })
      console.log(data)
      const dataLabel = await Label.findOne( {rawLabel: data.result} )
    } catch (error) {
      console.log(error)
    }
    // console.log(dataLabel)
    // newHistory.createdAt = new Date();
    // History
    //   .create(newHistory)
    //   .then(history => {
    //     res.status(201).json(history)
    //   })
    //   .catch(err => {
    //     res.status(500).json({
    //       message: err.message
    //     })
    //   })
  },
  getHistory: function (req, res) {
    History
      .find({ userId: req.currentUser._id })
      .populate('userId')
      .sort('-createdAt')
      .then(histories => {
        res.status(200).json(histories)
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },
  deleteHistory: function (req, res) {
    History
      .findOneAndDelete({ _id: req.params.id })
      .then(() => {
        res.status(200).json({
          message: 'History deleted!'
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  }
}