const User = require('../models/User');
const { comparePassword, generateToken } = require('../helpers');

module.exports = {
  register: function (req, res) {
    let newUser = {...req.body};
    User
      .create(newUser)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => { 
        err = err.errors
        if (err.hasOwnProperty('email')) {
          res.status(400).json(err.email.message)
        } else if (err.hasOwnProperty('password')) {
          res.status(400).json(err.password.message)
        } else {
          res.status(500).json({
            message: err.message
          })
        }
      })
  },
  login: function (req, res) {
    User
      .findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          if (comparePassword(req.body.password, user.password)) {
            let token = generateToken({
              email: user.email
            })
            res.status(200).json({ 
              token: token,
              email: user.email
            })
          } else {
            res.status(400).json({
              message: 'Wrong Email/Password'
            })
          }
        } else {
          res.status(400).json({
            message: 'Wrong Email/Password'
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },
  checkLogin: function (req, res) {
    User
      .findOne({ _id: req.currentUser._id })
      .then(user => {
        if (user) {
          res.status(200).json(user)
        } else {
          res.status(400).json({
            message: 'Please login first'
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  }
}