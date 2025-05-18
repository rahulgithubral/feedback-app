import FeedbackList from "./components/FeedbackList";
import AnalyticsCard from "./components/AnalyticsCard";
import FeedbackForm from "./components/FeedbackForm";

function App() {
  return (
    
    <div className="bg-gray-100 min-h-screen">
      <FeedbackForm />
      <AnalyticsCard />
      <FeedbackList />


    </div>
    
  );
}

export default App;
