const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  topic: { type: String, enum: ['tech', 'health', 'travel', 'news'], required: true },
  picture: { type: String },
  comments: [{ body: String, date: Date }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);
