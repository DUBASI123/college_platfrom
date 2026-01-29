const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  collegeId: { type: String, required: true, unique: true },
  year: { type: Number, enum: [1, 2, 3, 4, 7], default: 4 },
  department: { type: String, required: true },
  profilePicture: { type: String },
  bio: { type: String },
  phone: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
