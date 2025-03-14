const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  title: String,
  type: {
    type: String,
    enum: ['course', 'book', 'article', 'video', 'certification']
  },
  url: String,
  description: String
});

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced']
  }
});

const MilestoneSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  duration: {
    value: Number,
    unit: {
      type: String,
      enum: ['days', 'weeks', 'months'],
      default: 'weeks'
    }
  },
  resources: [ResourceSchema],
  skills: [String],
  projects: [ProjectSchema],
  completed: {
    type: Boolean,
    default: false
  }
});

const RoadmapSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  career: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Career',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  milestones: [MilestoneSchema],
  estimatedCompletion: {
    value: Number,
    unit: {
      type: String,
      enum: ['weeks', 'months', 'years'],
      default: 'months'
    }
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Roadmap', RoadmapSchema);
