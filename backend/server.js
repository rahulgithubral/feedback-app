require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();


app.use(cors());
app.use(express.json());

// ✅ Import Feedback model here
//const Feedback = require("./models/Feedback");

// Connect to MongoDB
mongoose
.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

  const Feedback = require("./models/Feedback");

// Your routes below
app.get("/analytics", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();

    const totalFeedbacks = feedbacks.length;
    const averageRating =
      totalFeedbacks > 0
        ? (
            feedbacks.reduce((sum, f) => sum + Number(f.rating), 0) /
            totalFeedbacks
          ).toFixed(2)
        : 0;

    res.json({
      totalFeedbacks,
      averageRating,
    });
  } catch (err) {
    console.error("Analytics error:", err);
    res.status(500).json({ error: "Failed to generate analytics" });
  }
});
// Add POST /feedback and GET /feedback routes if not already

// GET /feedback - retrieve all feedbacks
app.get("/feedback", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    console.error("Feedback fetch error:", err);
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
});

// POST /feedback - submit new feedback
app.post("/feedback", async (req, res) => {
  try {
    const { name, rating, comment } = req.body;
    
    // Validation
    if (!name || !rating || !comment) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }
    
    const newFeedback = new Feedback({ name, rating, comment });
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (err) {
    console.error("Feedback submission error:", err);
    res.status(500).json({ error: "Failed to submit feedback" });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Trigger redeploy for feedback submission fix
