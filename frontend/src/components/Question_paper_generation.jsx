import React, { useState } from 'react';
import axios from 'axios';
import Navbar from "./Navbar";

function Question_paper_generation() {
    const [totalMarks, setTotalMarks] = useState('');
    const [easyPercentage, setEasyPercentage] = useState('');
    const [mediumPercentage, setMediumPercentage] = useState('');
    const [hardPercentage, setHardPercentage] = useState('');
    const [questionPaper, setQuestionPaper] = useState(null);
  
    const handleGeneratePaper = async () => {
        console.log(totalMarks)
      try {
        const response = await axios.post('http://localhost:5000/generate-paper', {
          totalMarks: parseInt(totalMarks),
          difficultyDistribution: {
            Easy: parseInt(easyPercentage),
            Medium: parseInt(mediumPercentage),
            Hard: parseInt(hardPercentage),
          }, 
            headers: {
              'Content-Type': 'application/json',
            },
        });
        console.log(response)
  
        setQuestionPaper(response.data);
      } catch (error) {
        console.error('Error generating question paper:', error);
      }
    };
  
  return (
    <div className="App">
        <Navbar/>
    <h1>Question Paper Generator</h1>
    <div>
      <label>Total Marks:</label>
      <input type="number" value={totalMarks} onChange={(e) => setTotalMarks(e.target.value)} />
    </div>
    <div>
      <label>Percentage of Easy Questions:</label>
      <input type="number" value={easyPercentage} onChange={(e) => setEasyPercentage(e.target.value)} />
    </div>
    <div>
      <label>Percentage of Medium Questions:</label>
      <input type="number" value={mediumPercentage} onChange={(e) => setMediumPercentage(e.target.value)} />
    </div>
    <div>
      <label>Percentage of Hard Questions:</label>
      <input type="number" value={hardPercentage} onChange={(e) => setHardPercentage(e.target.value)} />
    </div>
    <button onClick={handleGeneratePaper}>Generate Question Paper</button>

    {questionPaper && (
        <div>
          <h2>Generated Question Paper</h2>
          <p>Total Marks: {questionPaper.totalMarks}</p>
          {questionPaper.sections.map((section, index) => (
            <div key={index}>
              <p>
                {section.difficulty} Questions: {section.marks} Marks
              </p>
              <ul>
                {section.questions.map((q, i) => (
                  <li key={i}>
                    {q.question} - {q.marks} Marks
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
  </div>

  )
}

export default Question_paper_generation
