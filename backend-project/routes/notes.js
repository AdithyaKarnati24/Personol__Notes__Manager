const express = require('express');
const Joi = require('joi');
const Note = require('../models/Note');

const router = express.Router();

// Joi Validation Schema
const noteSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().valid('Work', 'Personal', 'Others').default('Others'),
  completed: Joi.boolean()
});

// Create Note
router.post('/', async (req, res) => {
  try {
    const { error, value } = noteSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const newNote = new Note({
      ...value,
      updated_at: Date.now()
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Notes
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    const filters = {};

    if (category) filters.category = category;
    if (search) filters.title = new RegExp(search, 'i');

    const notes = await Note.find(filters).sort({ created_at: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Note
router.put('/:id', async (req, res) => {
  try {
    const { error, value } = noteSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updatedNote = await Note.findByIdAndUpdate(req.params.id, { ...value, updated_at: Date.now() }, { new: true });
    if (!updatedNote) return res.status(404).json({ message: 'Note not found' });

    res.status(200).json(updatedNote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete Note
router.delete('/:id', async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).json({ message: 'Note not found' });

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;