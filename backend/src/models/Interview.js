const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['mock', 'recorded', 'live'], required: true },
  description: String,
  duration: Number,
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
  videoUrl: String,
  questions: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  enrolledUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Interview', interviewSchema);
