const mongoose = require('mongoose');

const placementSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  jobTitle: String,
  ctcOffered: Number,
  department: String,
  placedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  description: String,
  requirements: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Placement', placementSchema);
