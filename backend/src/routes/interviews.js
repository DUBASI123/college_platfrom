const express = require('express');
const router = express.Router();
const Interview = require('../models/Interview');

// Get all interviews
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    const filter = type ? { type } : {};
    const interviews = await Interview.find(filter).populate('createdBy', 'name email');
    res.json(interviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get interview by ID
router.get('/:id', async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('enrolledUsers', 'name email');
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }
    res.json(interview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create interview
router.post('/', async (req, res) => {
  try {
    const { title, type, description, duration, difficulty, videoUrl, questions, createdBy } = req.body;
    const interview = new Interview({
      title,
      type,
      description,
      duration,
      difficulty,
      videoUrl,
      questions,
      createdBy
    });
    await interview.save();
    res.status(201).json({ message: 'Interview created', interview });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Enroll in interview
router.post('/:id/enroll', async (req, res) => {
  try {
    const { userId } = req.body;
    const interview = await Interview.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { enrolledUsers: userId } },
      { new: true }
    );
    res.json({ message: 'Enrolled successfully', interview });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
