const User = require('../models/User');
const History = require('../models/History');
const Recommendation = require('../models/Recommendation');

module.exports = {
  clearDBUser: function (done) {
    if (process.env.NODE_ENV === 'test') {
      User
        .deleteMany({})
        .then(() => {
          done()
        })
        .catch(err => {
          console.log(err)
          done()
        })
    }
  },
  clearDBHistory: function (done) {
    if (process.env.NODE_ENV === 'test') {
      History
        .deleteMany({})
        .then(() => {
          done()
        })
        .catch(err => {
          console.log(err)
          done()
        })
    }
  },
  clearDBRecommend: function (done) {
    if (process.NODE_ENV === 'test') {
      Recommendation
        .deleteMany({})
        .then(() => {
          done()
        })
        .catch(err => {
          console.log(err)
          done()
        })
    }
  }
}