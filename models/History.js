const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  image: {
    type: String
  },
  content: {
    type: String
  },
  createdAt: {
    type: Date
  }
});

const History = mongoose.model('History', HistorySchema);

module.exports = History;