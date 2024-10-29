import { createContext, useState, useEffect } from "react";
// import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    const response = await fetch(
      `http://localhost:4001/feedback?_sort=id&_order=desc`
    )
      .then((res) => res.json())
      .then((data) => {
        setFeedback(data);
        setIsLoading(false);
      });
  };

  // Add feedback to backend
  const addFeedback = async (newFeedback) => {
    const response = await fetch(
      `http://localhost:4001/feedback?_sort=id&_order=desc`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFeedback),
      }
    )
      .then((response) => response.json())
      .then((data) => setFeedback([data, ...feedback]));

    // newFeedback.id = uuidv4();
  };

  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await fetch(`http://localhost:4001/feedback/${id}`, { method: "DELETE" });

      setFeedback(feedback.filter((item) => item.id !== id)); // set - item to delete
    }
  };

  // Update item after edit
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`http://localhost:4001/feedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updItem),
    })
      .then((response) => response.json())
      .then((data) => {
        setFeedback(
          feedback.map((item) =>
            item.id === id
              ? {
                  ...item,
                  ...data,
                }
              : item
          )
        );
      });
  };

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        addFeedback,
        deleteFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
