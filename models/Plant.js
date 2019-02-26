const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlantSchema = new Schema({
  name: {
    type: String
  },
  image: {
    type: String
  },
  diseases: []
})

const Plant = mongoose.model('Plant', PlantSchema);

module.exports = Plant;