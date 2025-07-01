import { useState } from "react";

export default function FeedbackForm() {
  const [formData, setFormData] = useState({ name: "", rating: 5, comment: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4 p-4 shadow-xl bg-white rounded">
      <h2 className="text-xl font-bold">Submit Feedback</h2>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your name"
        className="w-full p-2 border rounded"
      />
      <select
        name="rating"
        value={formData.rating}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            {n} Star{n > 1 ? "s" : ""}
          </option>
        ))}
      </select>
      <textarea
        name="comment"
        value={formData.comment}
        onChange={handleChange}
        placeholder="Your comment"
        className="w-full p-2 border rounded"
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
}
