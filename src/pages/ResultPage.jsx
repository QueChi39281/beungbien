import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResultPage.css';
import QuestionCounter from '../components/QuestionCounter';
import StoredCharacter from '../components/StoredCharacter';

const ResultPage = () => {
    const navigate = useNavigate();
    const [resultData, setResultData] = useState(null);
    const [totalQuestions, setTotalQuestions] = useState(0);

    useEffect(() => {
        const savedResult = localStorage.getItem('user_last_result');
        const savedScenarios = localStorage.getItem('all_scenarios');

        if (savedResult && savedScenarios) {
            setResultData(JSON.parse(savedResult));
            const list = JSON.parse(savedScenarios);
            setTotalQuestions(list.length); 
        } else {
            navigate('/');
        }
    }, [navigate]);

    if (!resultData) return null;

    const { question, selectedChoice, currentIndex } = resultData;

    const getStatusClass = (status) => {
        switch (status) {
            case "Rất tốt": return "correct";
            case "Khá": return "warning";
            case "Tệ": return "wrong";
            case "Nguy hiểm": return "danger";
            default: return "correct";
        }
    };

    const statusClass = getStatusClass(selectedChoice.status);

    const handleNext = () => {
        const savedScenarios = localStorage.getItem('all_scenarios');
        if (savedScenarios) {
            const list = JSON.parse(savedScenarios);
            const nextIndex = currentIndex + 1;
            if (nextIndex < list.length) {
                localStorage.setItem('current_question_index', nextIndex.toString());
                navigate('/question');
            } else {
                navigate('/summary');
            }
        } else {
            navigate('/choice-level');
        }
    };

    return (
        <div className={`result-page-container ${statusClass}-page`}>
            {/* GỌI COUNTER Ở ĐÂY - NÓ SẼ NẰM Ở GÓC TRÊN BÊN TRÁI NHỜ CSS ABSOLUTE */}
            
            <main className="result-main-layout">
                <div className="result-left-column">
                    <div className="result-question-card">
                        {question}
                    </div>

                    <div className={`result-answer-box ${statusClass}`}>
                        {selectedChoice.text}
                    </div>

                    <div className="result-explanation-card">
                        <div className="explanation-header">
                            <span className="icon">
                                {selectedChoice.score >= 8 ? "✨" : "💡"}
                            </span>
                            <span className={`title text-${statusClass}`}>{selectedChoice.status}!</span>
                        </div>
                        <p className="explanation-text">
                            {selectedChoice.explain}
                        </p>
                    </div>

                    <div className="button-wrapper">
                        <button className="next-button" onClick={handleNext}>
                            <span>TIẾP TỤC</span>
                            <div className="button-icon">➔</div>
                        </button>
                    </div>
                </div>

                <div className="result-right-column">
                    <div className="result-character-frame">
                        <StoredCharacter />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ResultPage;