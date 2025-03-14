const mongoose = require('mongoose');

const AssessmentResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assessment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assessment',
    required: true
  },
  answers: [{
    question: mongoose.Schema.Types.ObjectId,
    answer: mongoose.Schema.Types.Mixed
  }],
  results: {
    type: Map,
    of: Number
  },
  recommendedCareers: [{
    career: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Career'
    },
    matchPercentage: Number
  }],
  completedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AssessmentResult', AssessmentResultSchema);
