// QuestionForm.js
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from "./Navbar.jsx";

function QuestionForm() {
  const [formData, setFormData] = useState({
    question: '',
    subject: '',
    topic: '',
    difficulty: '',
    marks: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Log the form data to the console before making the request
      console.log('Form Data:', formData);

      // Make a POST request to your backend endpoint
      await axios.post('http://localhost:5000/submitForm', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
      // Reset the form after submission
      setFormData({
        question: '',
        subject: '',
        topic: '',
        difficulty: '',
        marks: 0,
      });

      alert('Question submitted successfully!');
    } catch (error) {
      console.error('Error submitting question:', error.message);
    }
  };

  return (
    <div>
      <Navbar/>
      <h1>Question Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="question">Question:</label>
        <input
          type="text"
          id="question"
          name="question"
          value={formData.question}
          onChange={handleChange}
          required
        /><br />

        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        /><br />

        <label htmlFor="topic">Topic:</label>
        <input
          type="text"
          id="topic"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          required
        /><br />

        <label htmlFor="difficulty">Difficulty:</label>
        <input
          type="text"
          id="difficulty"
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          required
        /><br />

        <label htmlFor="marks">Marks:</label>
        <input
          type="number"
          id="marks"
          name="marks"
          value={formData.marks}
          onChange={handleChange}
          required
        /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default QuestionForm;
