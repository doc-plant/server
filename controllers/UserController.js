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
        } else {
          res.status(400).json(err.password.message)
        } 
        // else {
        //   res.status(500).json({
        //     message: err.message
        //   })
        // }
      })
  },
  login: function (req, res) {
    User
      .findOne({ email: req.body.email })
      .then(user => {
          if ( user && comparePassword(req.body.password, user.password)) {
            let token = generateToken({
              email: user.email
            })
            res.status(200).json({ 
              token: token,
              email: user.email,
              avatar: user.avatar,
              fullname: user.fullname,
              _id: user._id
            })
          } else {
            res.status(400).json({
              message: 'Wrong Email/Password'
            })
        } 
      })
      // .catch(err => {
      //   res.status(500).json({
      //     message: err.message
      //   })
      // })
  },
  checkLogin: function (req, res) {
    User
      .findOne({ _id: req.currentUser._id })
      .then(user => {
          res.status(200).json(user)
      })
      // .catch(err => {
      //   res.status(500).json({
      //     message: err.message
      //   })
      // })
  },
  googleLogin: async function (req, res) {
    console.log(req.body)
    let newUser = {...req.body};
    newUser.password = 'Sembarang12@'
    let user = await User.findOne({email: req.body.email})
    if (!user) {
      console.log('masuk')
      user = await User.create(newUser)
    }

    let token = generateToken({
      email: user.email
    })
    res.status(200).json({ 
      token: token,
      email: user.email,
      avatar: user.avatar,
      fullname: user.fullname,
      _id: user._id
    })
}
}