const express = require('express');
const router = express.Router();
const Placement = require('../models/Placement');

// Get all placements
router.get('/', async (req, res) => {
  try {
    const placements = await Placement.find().populate('placedStudents', 'name email');
    res.json(placements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get placement by ID
router.get('/:id', async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id).populate('placedStudents', 'name email');
    if (!placement) {
      return res.status(404).json({ message: 'Placement not found' });
    }
    res.json(placement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create placement
router.post('/', async (req, res) => {
  try {
    const { companyName, jobTitle, ctcOffered, department, description, requirements } = req.body;
    const placement = new Placement({
      companyName,
      jobTitle,
      ctcOffered,
      department,
      description,
      requirements
    });
    await placement.save();
    res.status(201).json({ message: 'Placement created', placement });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark student as placed
router.post('/:id/mark-placed', async (req, res) => {
  try {
    const { userId } = req.body;
    const placement = await Placement.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { placedStudents: userId } },
      { new: true }
    );
    res.json({ message: 'Student marked as placed', placement });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
