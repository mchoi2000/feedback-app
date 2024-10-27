import FeedbackList from "../components/FeedbackList";
import FeedbackStats from "../components/FeedbackStats";
import FeedbackForm from "../components/FeedbackForm";

function Home() {
  return (
    <div>
      <FeedbackForm />
      <FeedbackStats />
      <FeedbackList />
    </div>
  );
}

export default Home;
