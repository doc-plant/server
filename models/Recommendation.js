const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecommendSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  diseaseId: {
    type: Schema.Types.ObjectId, ref: 'Disease'
  },
  content: {
    type: String
  },
  article: {
    type: String
  },
  createdAt: {
    type: Date
  }
})

const Recommendation = mongoose.model('Recommendation', RecommendSchema);

module.exports = Recommendation;