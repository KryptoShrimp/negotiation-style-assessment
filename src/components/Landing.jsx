import React from 'react';
import './Landing.css';

const Landing = ({ onStart }) => {
    return (
        <div className="landing-container slide-up">
            <div className="glass-panel text-center">
                <div className="badge fade-in">University of Colorado Anschutz</div>
                <h1 className="title-glow fade-in">Discover Your<br />Negotiation Style</h1>
                <p className="subtitle fade-in">
                    Unlock the secrets of how you handle conflict, reach agreements, and navigate relationships. Answer 25 questions to reveal your dominant negotiation profile and empower yourself to be a collaborative visionary in healthcare and beyond.
                </p>

                <div className="features fade-in">
                    <div className="feature">
                        <span className="icon">⏱️</span>
                        <span>~5 Minutes</span>
                    </div>
                    <div className="feature">
                        <span className="icon">🎯</span>
                        <span>25 Questions</span>
                    </div>
                    <div className="feature">
                        <span className="icon">💡</span>
                        <span>Actionable Insights</span>
                    </div>
                </div>

                <button className="btn-primary start-btn fade-in" onClick={onStart}>
                    Start Assessment
                </button>
            </div>
        </div>
    );
};

export default Landing;
