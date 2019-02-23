const User = require('../models/User');
const History = require('../models/History');

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
        })
    }
  }
}