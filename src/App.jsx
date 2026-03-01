import React, { useState } from 'react';
import Landing from './components/Landing';
import Questionnaire from './components/Questionnaire';
import Results from './components/Results';
import { questions } from './data/questions';
import './App.css';

function App() {
  const [view, setView] = useState('landing');
  const [answers, setAnswers] = useState({});

  const handleStart = () => {
    setView('questions');
    setAnswers({});
  };

  const handleComplete = (finalAnswers) => {
    setAnswers(finalAnswers);
    setView('results');
  };

  const handleRestart = () => {
    setView('landing');
    setAnswers({});
  };

  return (
    <div className="app-container">
      <div className="view-wrapper">
        {view === 'landing' && <Landing onStart={handleStart} />}
        {view === 'questions' && (
          <Questionnaire questions={questions} onComplete={handleComplete} />
        )}
        {view === 'results' && (
          <Results answers={answers} onRestart={handleRestart} />
        )}
      </div>
    </div>
  );
}

export default App;
