const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);
