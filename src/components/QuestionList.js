import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

function QuestionsList() {
  const [questionsList, setQuestionsList] = useState([]);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [editedText, setEditedText] = useState(''); // Added state for edited text

  useEffect(() => {
    // Fetch the list of questions when the component mounts
    fetch('http://localhost:3001/questions')
      .then((response) => response.json())
      .then((data) => setQuestionsList(data))
      .catch((error) => console.error('Error fetching questions:', error));
  }, []);

  const handleEditClick = (questionId, currentText) => {
    // Set the question ID to trigger editing mode
    setEditingQuestionId(questionId);
    // Initialize edited text with the current question text
    setEditedText(currentText);
  };

  const handleDeleteClick = async (questionId) => {
    try {
      // Send a DELETE request to remove the question
      const response = await fetch(`http://localhost:3001/questions/${questionId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted question from the list
        const updatedQuestionsList = questionsList.filter((question) => question.id !== questionId);
        setQuestionsList(updatedQuestionsList);
      } else {
        console.error('Error deleting question. Response status:', response.status);
      }
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const handleUpdateQuestion = async (questionId, updatedText) => {
    try {
      // Send a PUT request to update the question text
      const response = await fetch(`http://localhost:3001/questions/${questionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: updatedText }),
      });

      if (response.ok) {
        // Update the question text in the list
        const updatedQuestionsList = questionsList.map((question) =>
          question.id === questionId ? { ...question, text: updatedText } : question
        );
        setQuestionsList(updatedQuestionsList);
        // Exit editing mode
        setEditingQuestionId(null);
      } else {
        console.error('Error updating question. Response status:', response.status);
      }
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  return (
    <div>
      <h2>Questions List</h2>
      <ul>
        {questionsList.map((question) => (
          <li key={question.id}>
            {editingQuestionId === question.id ? (
              <div>
                <input
                  type="text"
                  value={editedText} // Use the editedText state
                  onChange={(e) => setEditedText(e.target.value)} // Update the edited text state
                />
                <button onClick={() => handleUpdateQuestion(question.id, editedText)}>Update</button> {/* Add Update button */}
              </div>
            ) : (
              <div>
                {question.text}
                <span style={{ marginLeft: '10px' }}>
                  <FaEdit onClick={() => handleEditClick(question.id, question.text)} style={{ cursor: 'pointer' }} />
                </span>
                <span style={{ marginLeft: '10px' }}>
                  <FaTrash onClick={() => handleDeleteClick(question.id)} style={{ cursor: 'pointer' }} />
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionsList;
