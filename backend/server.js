const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://raldell1500:raladmin1594@ralfeedcluster.lpqxmxw.mongodb.net/feedbackDB?retryWrites=true&w=majority&appName=RALfeedCluster", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Define Schema & Model
const feedbackSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  comment: String,
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// Routes
app.get("/feedback", async (req, res) => {
  const feedbacks = await Feedback.find();
  res.json(feedbacks);
});

app.post("/feedback", async (req, res) => {
  try {
    const { name, rating, comment } = req.body;
    console.log("📥 Received:", req.body); // ADD THIS
    const newFeedback = new Feedback({ name, rating, comment });
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (err) {
    console.error("❌ Save error:", err); // ADD THIS
    res.status(500).json({ error: "Failed to save feedback" });
  }
});

app.get("/analytics", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    const total = feedbacks.length;
    const average =
      total === 0
        ? 0
        : feedbacks.reduce((sum, f) => sum + Number(f.rating), 0) / total;

    res.json({
      totalFeedbacks: total,
      averageRating: average.toFixed(2),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});



// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
