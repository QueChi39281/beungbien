import React, { useState, useEffect } from 'react';
import iconAmThanh from '../assets/icon_amthanh.png';
import iconAmThanh2 from '../assets/icon_amthanh2.png';
import './ReadAloudButton.css';

const ReadAloudButton = ({ textToRead }) => {
    const [isReading, setIsReading] = useState(false);
    const synth = window.speechSynthesis;

    const handleSpeech = () => {
        if (isReading) {
            // Nếu đang đọc mà nhấn vào thì dừng lại
            synth.cancel();
            setIsReading(false);
        } else {
            // Nếu chưa đọc thì bắt đầu tạo giọng nói
            const utterance = new SpeechSynthesisUtterance(textToRead);
            
            // Thiết lập ngôn ngữ tiếng Việt
            utterance.lang = 'vi-VN';
            
            // Sự kiện khi bắt đầu đọc
            utterance.onstart = () => setIsReading(true);
            
            // Sự kiện khi đọc xong hoặc bị hủy
            utterance.onend = () => setIsReading(false);
            utterance.onerror = () => setIsReading(false);

            synth.speak(utterance);
        }
    };

    // Dừng đọc khi người dùng chuyển trang (component bị unmount)
    useEffect(() => {
        return () => {
            synth.cancel();
        };
    }, [synth]);

    return (
        <button className="read-aloud-btn" onClick={handleSpeech}>
            <img 
                src={isReading ? iconAmThanh2 : iconAmThanh} 
                alt="Read Aloud" 
                className="read-aloud-icon"
            />
        </button>
    );
};

export default ReadAloudButton;