const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  topic: { type: String, enum: ['tech', 'life', 'sports'], required: true },
  picture: String,
  comment: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
