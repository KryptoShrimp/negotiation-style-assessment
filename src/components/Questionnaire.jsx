import React, { useState } from 'react';
import './Questionnaire.css';

const labels = [
    { value: 0, label: "Never" },
    { value: 1, label: "Rarely" },
    { value: 2, label: "Sometimes" },
    { value: 3, label: "Occasionally" },
    { value: 4, label: "Frequently" },
    { value: 5, label: "Always" }
];

const Questionnaire = ({ questions, onComplete }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [animating, setAnimating] = useState(false);

    const question = questions[currentIndex];
    const progress = ((currentIndex) / questions.length) * 100;

    const handleSelect = (val) => {
        const newAnswers = { ...answers, [question.id]: val };
        setAnswers(newAnswers);

        // Auto-advance after a short delay
        if (currentIndex < questions.length - 1) {
            setAnimating(true);
            setTimeout(() => {
                setCurrentIndex(currentIndex + 1);
                setAnimating(false);
            }, 400);
        } else {
            // Completed, compute results
            setTimeout(() => {
                onComplete(newAnswers);
            }, 400);
        }
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            setAnimating(true);
            setTimeout(() => {
                setCurrentIndex(currentIndex - 1);
                setAnimating(false);
            }, 300);
        }
    };

    return (
        <div className="questionnaire-container">
            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>

            <div className={`glass-panel question-panel ${animating ? 'fade-out' : 'fade-in'}`}>
                <div className="header-row">
                    <button className="back-btn" onClick={handleBack} disabled={currentIndex === 0}>
                        ← Back
                    </button>
                    <span className="step-indicator">
                        Question {currentIndex + 1} of {questions.length}
                    </span>
                </div>

                <h2 className="question-text">{question.text}</h2>

                <div className="rating-options">
                    {labels.map((item) => (
                        <button
                            key={item.value}
                            className={`rating-btn ${answers[question.id] === item.value ? 'selected' : ''}`}
                            onClick={() => handleSelect(item.value)}
                        >
                            <div className="rating-value">{item.value}</div>
                            <div className="rating-label">{item.label}</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Questionnaire;
