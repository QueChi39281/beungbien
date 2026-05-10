import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuestionPage.css';
import AnswerOption from '../components/AnswerOption';
import QuestionCounter from '../components/QuestionCounter';
import StoredCharacter from '../components/StoredCharacter'; 
import ReadAloudButton from '../components/ReadAloudButton';

const QuestionPage = () => {
    const navigate = useNavigate();
    const [scenario, setScenario] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(1);

    // 1. Khởi tạo dữ liệu khi vào trang
    useEffect(() => {
        const savedScenarios = localStorage.getItem('all_scenarios');
        const savedIndex = parseInt(localStorage.getItem('current_question_index') || '0', 10);

        if (savedScenarios) {
            try {
                const list = JSON.parse(savedScenarios);
                // Kiểm tra xem danh sách có hợp lệ và chỉ số câu hỏi có tồn tại không
                if (Array.isArray(list) && list[savedIndex]) {
                    setScenario(list[savedIndex]);
                    setCurrentIndex(savedIndex);
                    setTotalQuestions(list.length);
                } else {
                    // Nếu index vượt quá giới hạn (ví dụ đã hết câu hỏi), về trang chọn level
                    navigate('/choice-level');
                }
            } catch (error) {
                console.error("Lỗi đọc kho dữ liệu:", error);
                navigate('/choice-level');
            }
        } else {
            // Nếu không có dữ liệu trong kho
            navigate('/choice-level');
        }
    }, [navigate]);

    // 2. Xử lý khi nhấn XÁC NHẬN
    const handleConfirm = () => {
        if (!selectedId) {
            alert("Con hãy chọn một đáp án nhé!");
            return;
        }

        // --- LOGIC CỘNG ĐIỂM TÍCH LŨY ---
        const currentTotalScore = parseInt(localStorage.getItem('total_score') || '0', 10);
        const choiceScore = scenario.choices[selectedId]?.score || 0;
        localStorage.setItem('total_score', (currentTotalScore + choiceScore).toString());

        // --- LƯU KẾT QUẢ ĐỂ HIỂN THỊ TẠI RESULT PAGE ---
        const userResult = {
            question: scenario.question,
            selectedChoice: scenario.choices[selectedId],
            allChoices: scenario.choices,
            selectedId: selectedId,
            currentIndex: currentIndex 
        };

        localStorage.setItem('user_last_result', JSON.stringify(userResult));
        
        // Điều hướng sang trang kết quả câu hỏi
        navigate('/result'); 
    };

    // 3. Hiển thị Loading nếu dữ liệu chưa kịp nạp
    if (!scenario || !scenario.choices) {
        return (
            <div className="question-page-container">
                <div className="loading-card">Đang nạp tình huống cho bé...</div>
            </div>
        );
    }

    // Biến phụ trợ cho việc hiển thị và đọc loa
    const options = Object.keys(scenario.choices).map(key => ({
        id: key, 
        text: scenario.choices[key]?.text || ""
    }));

    const textToRead = `Câu hỏi: ${scenario.question}. ` + 
        options.map(opt => `Đáp án ${opt.id}: ${opt.text}`).join(". ");

    return (
        <div className="question-page-container">
            <div className="header-controls">
                {/* Nút đọc câu hỏi bằng giọng nói */}
                <ReadAloudButton textToRead={textToRead} />
                {/* Hiển thị số thứ tự câu hỏi (ví dụ 1/3) */}
                <QuestionCounter current={currentIndex + 1} total={totalQuestions} />
            </div>

            <div className="main-content-layout">
                <div className="left-column">
                    {/* Thẻ hiển thị câu hỏi */}
                    <div className="question-card">
                        {scenario.question}
                    </div>

                    {/* Lưới hiển thị các đáp án */}
                    <div className="answer-grid">
                        {options.map(item => (
                            <AnswerOption 
                                key={item.id}
                                text={item.text}
                                isSelected={selectedId === item.id}
                                onClick={() => setSelectedId(item.id)}
                            />
                        ))}
                    </div>

                    {/* Nút xác nhận lựa chọn */}
                    <button 
                        className={`confirm-button ${selectedId ? 'active' : ''}`}
                        onClick={handleConfirm}
                        disabled={!selectedId} // Chỉ cho bấm khi đã chọn đáp án
                    >
                        XÁC NHẬN
                    </button>
                </div>

                <div className="right-column">
                    {/* Hiển thị nhân vật của bé */}
                    <div className="character-frame">
                        <StoredCharacter />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionPage;