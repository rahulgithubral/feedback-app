import { useState } from "react";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({ name: "", rating: 5, comment: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://feedback-app-2hqw.onrender.com/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to send feedback");

      const data = await res.json();
      alert(`Thanks for your feedback, ${data.name}!`);
      setFormData({ name: "", rating: 5, comment: "" });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4 p-6 shadow-2xl bg-[#1A1A1A] rounded-xl">
      <h2 className="text-2xl font-bold text-[#7F5AF0]">Submit Feedback</h2>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your name"
        className="w-full p-3 rounded bg-[#0F0F0F] text-white border border-[#5D3FD3]"
      />
      <select
        name="rating"
        value={formData.rating}
        onChange={handleChange}
        className="w-full p-3 rounded bg-[#0F0F0F] text-white border border-[#5D3FD3]"
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>{n} Star{n > 1 ? "s" : ""}</option>
        ))}
      </select>
      <textarea
        name="comment"
        value={formData.comment}
        onChange={handleChange}
        placeholder="Your comment"
        className="w-full p-3 rounded bg-[#0F0F0F] text-white border border-[#5D3FD3]"
      />
      <button className="bg-[#2CBDFE] hover:bg-[#5D3FD3] text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
};

export default FeedbackForm;
