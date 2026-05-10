import React from 'react';
import './QuestionCounter.css';

const QuestionCounter = ({ current, total }) => {
    return (
        <div className="question-counter">
            {current}/{total}
        </div>
    );
};

export default QuestionCounter;