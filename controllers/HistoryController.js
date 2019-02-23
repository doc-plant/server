const History = require('../models/History');

module.exports = {
  addHistory: function (req, res) {
    let newHistory = {...req.body};
    newHistory.userId = req.currentUser._id;
    newHistory.createdAt = new Date();
    History
      .create(newHistory)
      .then(history => {
        res.status(201).json(history)
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
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