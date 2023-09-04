import React, { useState, useEffect } from 'react';

const ListQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});
  const [responseCounts, setResponseCounts] = useState({
    agree: 0,
    neutral: 0,
    disagree: 0,
    totalQuestions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the provided URL
    fetch('http://localhost:3001/questions')
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data); // Assuming data is an array of questions
        setLoading(false); // Set loading to false when data is received
      })
      .catch((error) => {
        setError(error); // Set error state if there's an issue
        setLoading(false); // Set loading to false when there's an error
      });

    // Fetch response counts from the server
    fetch('http://localhost:3001/responseCounts')
      .then((response) => response.json())
      .then((data) => {
        setResponseCounts(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const handleRadioChange = (questionIndex, selectedResponse) => {
    const updatedSelectedValues = { ...selectedValues };
    updatedSelectedValues[questionIndex] = selectedResponse;
    setSelectedValues(updatedSelectedValues);
  };

  const handleSubmit = async () => {
    // ... Your handleSubmit logic remains the same ...
  };

  const rowColors = ['#BBDEFB', '#03A9F4', '#2CCCE4', '#1976D2'];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="centered-container">
      <table>
        <thead>
          <tr>
            <th style={{ fontWeight: 'bold' }}>Question</th>
            <th style={{ fontWeight: 'bold' }}>Response</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={index}>
              <td>{question.text}</td>
              <td>
                <input
                  type="radio"
                  name={`response-${index}`}
                  value="agree"
                  checked={selectedValues[index] === 'agree'}
                  onChange={() => handleRadioChange(index, 'agree')}
                />
                Agree
                <input
                  type="radio"
                  name={`response-${index}`}
                  value="neutral"
                  checked={selectedValues[index] === 'neutral'}
                  onChange={() => handleRadioChange(index, 'neutral')}
                />
                Neutral
                <input
                  type="radio"
                  name={`response-${index}`}
                  value="disagree"
                  checked={selectedValues[index] === 'disagree'}
                  onChange={() => handleRadioChange(index, 'disagree')}
                />
                Disagree
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default ListQuiz;
