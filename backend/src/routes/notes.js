const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Get all notes
router.get('/', async (req, res) => {
  try {
    const { category, subject } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (subject) filter.subject = subject;
    const notes = await Note.find(filter).populate('userId', 'name email');
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get note by ID
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).populate('userId', 'name email');
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create note
router.post('/', async (req, res) => {
  try {
    const { title, content, subject, category, userId, fileUrl, tags } = req.body;
    const note = new Note({
      title,
      content,
      subject,
      category,
      userId,
      fileUrl,
      tags
    });
    await note.save();
    res.status(201).json({ message: 'Note created', note });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update note
router.put('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    res.json({ message: 'Note updated', note });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete note
router.delete('/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
