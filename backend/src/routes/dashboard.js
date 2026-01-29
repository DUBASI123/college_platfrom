const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Project = require('../models/Project');
const Interview = require('../models/Interview');
const Note = require('../models/Note');
const Placement = require('../models/Placement');

// Get dashboard stats
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    
    const userProjects = await Project.countDocuments({ userId });
    const totalProjects = await Project.countDocuments();
    const totalInterviews = await Interview.countDocuments();
    const totalNotes = await Note.countDocuments();
    const totalPlacements = await Placement.countDocuments();
    
    const user = await User.findById(userId).select('-password');

    res.json({
      user,
      stats: {
        userProjects,
        totalProjects,
        totalInterviews,
        totalNotes,
        totalPlacements
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
