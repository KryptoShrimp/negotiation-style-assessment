import React, { useMemo } from 'react';
import { styles as styleData } from '../data/styles';
import { questions } from '../data/questions';
import './Results.css';

const Results = ({ answers, onRestart }) => {
    const { results, primaryStyleCode } = useMemo(() => {
        // Initialize scores
        const scores = { A: 0, B: 0, C: 0, D: 0, E: 0 };

        // Sum scores
        for (const [qId, score] of Object.entries(answers)) {
            const q = questions.find(q => q.id === parseInt(qId));
            if (q) {
                scores[q.style] += score;
            }
        }

        // Find primary style
        let max = -1;
        let primary = 'E'; // default

        for (const [style, score] of Object.entries(scores)) {
            if (score > max) {
                max = score;
                primary = style;
            }
        }

        return { results: scores, primaryStyleCode: primary };
    }, [answers]);

    const primaryStyle = styleData[primaryStyleCode];

    const sortedScores = Object.entries(results)
        .sort((a, b) => b[1] - a[1])
        .map(([code, score]) => ({
            code,
            score,
            ...styleData[code]
        }));

    return (
        <div className="results-container slide-up">
            <div className="glass-panel text-center mb-8">
                <h2 className="title-glow mb-2">Your Primary Style</h2>
                <h1 className="style-name">{primaryStyle.name}</h1>
                <div className="badge outcome-badge">Typical Outcome: {primaryStyle.outcome}</div>

                <p className="style-description">
                    {primaryStyle.description}
                </p>

                <div className="score-summary">
                    <div className="score-value">{results[primaryStyleCode]} / 25</div>
                    <div className="score-label">Affinity Score</div>
                </div>
            </div>

            <div className="details-grid">
                <div className="glass-panel">
                    <h3 className="section-title">When is this appropriate?</h3>
                    <ul className="insights-list">
                        {primaryStyle.appropriateWhen.map((item, idx) => (
                            <li key={idx}>
                                <span className="check-icon">✓</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="glass-panel">
                    <h3 className="section-title">Your Score Breakdown</h3>
                    <div className="breakdown-bars">
                        {sortedScores.map((item) => (
                            <div key={item.code} className="bar-row">
                                <div className="bar-label">
                                    <span>{item.name}</span>
                                    <span className="bar-score">{item.score}</span>
                                </div>
                                <div className="bar-track">
                                    <div
                                        className={`bar-fill ${item.code === primaryStyleCode ? 'primary-fill' : ''}`}
                                        style={{ width: `${(item.score / 25) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="text-center mt-8">
                <button className="btn-primary" onClick={onRestart}>
                    Take Assessment Again
                </button>
            </div>
        </div>
    );
};

export default Results;
