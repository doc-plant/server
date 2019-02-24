const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LabelSchema = new Schema({
  rawLabel: {
    type: String
  },
  fixLabel: {
    type: String
  },
  diseaseId: {
    type: Schema.Types.ObjectId, ref: 'Disease'
  }
})

const Label = mongoose.model('Label', LabelSchema);

module.exports = Label;

