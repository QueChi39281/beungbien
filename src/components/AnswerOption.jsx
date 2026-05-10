import React from 'react';
import './AnswerOption.css';

const AnswerOption = ({ text, onClick, isSelected }) => {
  return (
    <div 
      className={`answer-option ${isSelected ? 'selected' : ''}`} 
      onClick={onClick}
    >
      <p className="answer-text">{text}</p>
    </div>
  );
};

export default AnswerOption;