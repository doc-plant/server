const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  image: {
    type: String
  },
  labelId: {
    type: Schema.Types.ObjectId, ref: 'Label'
  }
}, {
  timestamps: true
});

const History = mongoose.model('History', HistorySchema);

module.exports = History;