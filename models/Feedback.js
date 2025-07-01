const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  comment: String,
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
