const express = require('express');
const Blog = require('../models/Blog');
const { protect, isAdmin } = require('../middleware/auth');
const router = express.Router();

// Create
router.post('/', protect, isAdmin, async (req, res) => {
  try {
    const blog = await Blog.create({ ...req.body, author: req.user._id });
    res.status(201).json(blog);
  } catch {
    res.status(400).json({ error: 'Creation failed' });
  }
});

// Get all
router.get('/', async (req, res) => {
  const blogs = await Blog.find().populate('author', 'username');
  res.json(blogs);
});

// Get one
router.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
});

// Update
router.put('/:id', protect, isAdmin, async (req, res) => {
  const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete
router.delete('/:id', protect, isAdmin, async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted' });
});

module.exports = router;
