import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResultPage.css';
import QuestionCounter from '../components/QuestionCounter';
import StoredCharacter from '../components/StoredCharacter';

const ResultPage = () => {
    const navigate = useNavigate();
    const [resultData, setResultData] = useState(null);

    useEffect(() => {
        // Lấy dữ liệu kết quả vừa lưu từ QuestionPage
        const savedResult = localStorage.getItem('user_last_result');
        if (savedResult) {
            setResultData(JSON.parse(savedResult));
        } else {
            // Nếu không có dữ liệu thì quay về trang chủ
            navigate('/');
        }
    }, [navigate]);

    if (!resultData) return null;

    const { question, selectedChoice } = resultData;

    // Hàm chuyển đổi status từ JSON sang Class CSS
    // JSON status: "Rất tốt", "Khá", "Tệ", "Nguy hiểm"
    const getStatusClass = (status) => {
        switch (status) {
            case "Rất tốt": return "correct";   // Màu xanh
            case "Khá": return "warning";      // Màu cam/vàng
            case "Tệ": return "wrong";         // Màu đỏ nhạt
            case "Nguy hiểm": return "danger"; // Màu đỏ đậm
            default: return "correct";
        }
    };

    const statusClass = getStatusClass(selectedChoice.status);

    const handleNext = () => {
        // Logic để chuyển sang câu hỏi tiếp theo
        // Hiện tại quay lại trang chọn level hoặc trang câu hỏi mới
        navigate('/choice-level'); 
    };

    return (
        <div className={`result-page-container ${statusClass}-bg`}>
            <QuestionCounter />

            <main className="result-main-layout">
                <div className="result-left-column">
                    {/* Hiển thị câu hỏi */}
                    <div className="result-question-card">
                        {question}
                    </div>

                    {/* Khung đáp án đổi màu theo status */}
                    <div className={`result-answer-box ${statusClass}`}>
                        {selectedChoice.text}
                    </div>

                    {/* Khung giải thích và lời bình */}
                    <div className="result-explanation-card">
                        <div className="explanation-header">
                            <span className="icon">
                                {selectedChoice.score >= 8 ? "✨" : "💡"}
                            </span>
                            <span className="title">{selectedChoice.status}!</span>
                        </div>
                        <p className="text">
                            {selectedChoice.explain}
                        </p>
                    </div>

                    {/* Nút tiếp tục */}
                    <button className="next-button" onClick={handleNext}>
                        TIẾP TỤC
                    </button>
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