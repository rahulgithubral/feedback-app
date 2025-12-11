import { useEffect, useState } from "react";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
    // Poll for new feedbacks every 5 seconds to update in real-time
    const interval = setInterval(fetchFeedbacks, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch("https://feedback-app-2hqw.onrender.com/feedback");
      if (!res.ok) throw new Error("Failed to fetch feedbacks");
      const data = await res.json();
      setFeedbacks(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-400">Loading feedbacks...</p>;

  if (feedbacks.length === 0)
    return <p className="text-center mt-10 text-gray-400">No feedbacks yet.</p>;

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h3 className="text-xl font-bold text-[#7F5AF0] mb-2">📚 Recent Feedbacks</h3>
      {feedbacks.map(({ _id, name, rating, comment, createdAt }) => (
        <div key={_id} className="bg-[#1A1A1A] text-white p-4 rounded-xl shadow-lg">
          <p><strong>{name}</strong> rated <span className="font-bold">★{rating}</span></p>
          <p className="text-gray-400 italic">"{comment || "No comment"}"</p>
          {createdAt && (
            <p className="text-gray-500 text-sm mt-2">
              {new Date(createdAt).toLocaleDateString()} {new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
