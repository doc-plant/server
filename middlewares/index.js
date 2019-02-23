const User = require('../models/User');
const { verifyToken } = require('../helpers');

module.exports = {
  isLogin: function (req, res, next) {
    let token = req.headers.token;
    if (token) {
      let decoded = verifyToken(token);
      if (decoded) {
        User
          .findOne({ email: decoded.email })
          .then(user => {
            if (user) {
              req.currentUser = {
                _id: user._id,
                email: user.email
              }
              next();
            } else {
              res.status(400).json({
                message: 'Please login first'
              })
            }
          })
          .catch(err => {
            res.status(400).json({
              message: 'Unauthorized user'
            })
          })
      }
    }
  }
}