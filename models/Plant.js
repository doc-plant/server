const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlantSchema = new Schema({
  name: {
    type: String
  },
  image: {
    type: String
  },
  diseases: [{
    type: 'ObjectId',
    ref: 'Disease'
  }]
})

const Plant = mongoose.model('Plant', PlantSchema);

module.exports = Plant;