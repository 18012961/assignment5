import React, { useState } from 'react';
import QuestionsList from './QuestionList'; // Import the QuestionsList component

function AddQuestions() {
  const [question, setQuestion] = useState("");

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object to represent the new question
    const newQuestion = {
      text: question,
    };

    try {
      // Make a POST request to store the question in db.json (assuming it's served locally)
      await fetch("http://localhost:3001/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestion),
      });

      // Clear the input field after successfully saving the question
      setQuestion("");
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  return (
    <div>
      <h2>Add a Question</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="question">Question:</label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {/* Display the list of questions using the QuestionsList component */}
      <QuestionsList />
    </div>
  );
}

export default AddQuestions;
