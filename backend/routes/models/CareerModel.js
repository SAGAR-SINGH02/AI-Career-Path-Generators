const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: String,
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate'
  }
});

const CareerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  salaryRange: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'USD'
    }
  },
  growthRate: {
    value: Number,
    timeframe: String
  },
  requiredSkills: [SkillSchema],
  recommendedEducation: [{
    level: String,
    field: String,
    required: Boolean
  }],
  relatedCareers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Career'
  }],
  resources: [{
    title: String,
    type: {
      type: String,
      enum: ['course', 'book', 'article', 'video', 'certification']
    },
    url: String,
    description: String
  }]
});

module.exports = mongoose.model('Career', CareerSchema);
