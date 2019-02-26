const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiseaseSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: String
  }
})

const Disease = mongoose.model('Disease', DiseaseSchema);

module.exports = Disease;