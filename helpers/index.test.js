const User = require('../models/User');

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
  }
}