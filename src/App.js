import FeedbackForm from "./components/FeedbackForm";
import AnalyticsCard from "./components/AnalyticsCard";
import FeedbackList from "./components/FeedbackList";
import RatingPieChart from "./components/RatingPieChart";


function App() {
  return (
    <div className="bg-[#0F0F0F] min-h-screen text-[#EAEAEA] font-sans p-4">
      <FeedbackForm />
      <AnalyticsCard />
      <RatingPieChart /> {/* Add the pie chart here */}
      <FeedbackList />
    </div>
  );
}

export default App;
