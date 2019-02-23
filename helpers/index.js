const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = {
    generateToken: function(user) {
        return jwt.sign(user, process.env.JWT_SECRET)
    },
    comparePassword: function(input, currentPassword) {
        return bcrypt.compareSync(input, currentPassword)
    },
    verifyToken: function(token) {
        return jwt.verify(token, process.env.JWT_SECRET)
    }
}