const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const { lowerCase, upperCase, numberCase, specialCase } = require('../helpers/validatePassword');

const validatePassword = [
  { validator: lowerCase, msg: 'Password must contain at least one lower case alphabet' },
  { validator: upperCase, msg: 'Password must contain at least one upper case alphabet' },
  { validator: numberCase, msg: 'Password must contain at least one number characters' },
  { validator: specialCase, msg: 'Password must contain at least one special characters' }
];


const UserSchema = new Schema({
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  email: {
    type: String,
    required: [true, 'Email must be filled'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    validate: {
      validator: function (email) {
          return new Promise((resolve, reject) => {
              User
                  .findOne({ email: email, _id: { $ne: this._id } })
                  .then(found => {
                     if(found) {
                      reject(false);
                      } else {
                      resolve(true);
                      }
                  })
          })
      }, msg: `Email already exists!`
    }
  },
  password: {
    type: String,
    required: [true, 'Password must be filled!'],
    minlength: [6, 'Minimal input password 6 characters'],
    validate: validatePassword
  }
});

UserSchema.pre('save', function (next) {
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;