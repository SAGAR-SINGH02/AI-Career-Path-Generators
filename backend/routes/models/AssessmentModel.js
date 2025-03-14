const mongoose = require('mongoose');

const QuestionOptionSchema = new mongoose.Schema({
  text: String,
  value: mongoose.Schema.Types.Mixed
});

const QuestionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['multiple-choice', 'scale', 'open-ended'],
    default: 'multiple-choice'
  },
  options: [QuestionOptionSchema],
  category: String,
  weight: {
    type: Number,
    default: 1
  }
});

const AssessmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['personality', 'skills', 'interests', 'aptitude', 'values'],
    required: true
  },
  questions: [QuestionSchema],
  estimatedTime: {
    value: Number,
    unit: {
      type: String,
      enum: ['minutes', 'hours'],
      default: 'minutes'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Assessment', AssessmentSchema);
