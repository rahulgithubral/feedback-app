import { useEffect, useState } from "react";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch("https://feedback-app-2hqw.onrender.com/feedback")
      .then((res) => res.json())
      .then(setFeedbacks)
      .catch(console.error);
  }, []);

  if (feedbacks.length === 0) return <p className="text-center mt-10 text-gray-400">No feedbacks yet.</p>;

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h3 className="text-xl font-bold text-[#7F5AF0] mb-2">💬 Recent Feedbacks</h3>
      {feedbacks.map(({ _id, name, rating, comment }) => (
        <div key={_id} className="bg-[#1A1A1A] text-white p-4 rounded-xl shadow-lg">
          <p><strong>{name}</strong> rated <span className="font-bold">{rating} ⭐</span></p>
          <p className="text-gray-400 italic">"{comment || "No comment"}"</p>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
