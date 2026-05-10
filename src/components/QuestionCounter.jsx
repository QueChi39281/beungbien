import React from 'react';
import './QuestionCounter.css';

const QuestionCounter = ({ current = 2, total = 5 }) => {
    return (
        <div className="question-counter">
            {current}/{total}
        </div>
    );
};

export default QuestionCounter;