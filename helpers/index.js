const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const axios = require('axios')
const url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&key=[KEY YOUTUBE]="

module.exports = {
    generateToken: function (user) {
        return jwt.sign(user, process.env.JWT_SECRET)
    },
    comparePassword: function (input, currentPassword) {
        return bcrypt.compareSync(input, currentPassword)
    },
    verifyToken: function (token) {
        return jwt.verify(token, process.env.JWT_SECRET)
    },
    youtubeVideos: async function (search) {
        try {
            const { data } = await axios.get(url+search)
            const videos = data.items.map(v => ({id: v.id, title: v.snippet.title}))
            return videos
        } catch ({response}) {
            // return response
        }
    }
}
