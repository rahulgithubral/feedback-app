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
  .connect("mongodb+srv://raldell1500:raladmin1594@ralfeedcluster.lpqxmxw.mongodb.net/feedbackDB?retryWrites=true&w=majority&appName=RALfeedCluster", {
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
