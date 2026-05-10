import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import './QuestionPage.css';
import AnswerOption from '../components/AnswerOption';
import QuestionCounter from '../components/QuestionCounter';
import StoredCharacter from '../components/StoredCharacter'; 
import ReadAloudButton from '../components/ReadAloudButton';

const QuestionPage = () => {
    const navigate = useNavigate(); // Khởi tạo điều hướng
    const [scenario, setScenario] = useState(null);
    const [selectedId, setSelectedId] = useState(null);

    const mockScenario = {
        question: "Khi đang chơi ở sân trường, một người lạ tiến lại gần và bảo: 'Bố con bị tai nạn, chú là bạn bố, lên xe chú chở đến bệnh viện gấp'. Con sẽ làm gì?",
        choices: {
            A: { text: "Tin lời và đi theo chú ấy ngay để thăm bố.", status: "Nguy hiểm", score: 0 },
            B: { text: "Hỏi tên bố là gì rồi mới đi theo.", status: "Chưa đúng", score: 5 },
            C: { text: "Từ chối, chạy vào báo thầy cô hoặc bảo vệ trường.", status: "Chính xác", score: 10 },
            D: { text: "Đứng khóc tại chỗ và đợi người lạ dỗ dành.", status: "Nguy hiểm", score: 2 }
        }
    };

    useEffect(() => {
        const savedData = localStorage.getItem('current_scenarios');
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                if (parsedData && parsedData.question) {
                    setScenario(parsedData);
                } else {
                    setScenario(mockScenario);
                }
            } catch (error) {
                setScenario(mockScenario);
            }
        } else {
            setScenario(mockScenario);
        }
    }, []);

    // 2. Hàm xử lý khi chọn xong
    const handleConfirm = () => {
        if (!selectedId) {
            alert("Con hãy chọn một đáp án nhé!");
            return;
        }

        // Tạo object kết quả
        const userResult = {
            question: scenario.question,
            selectedChoice: scenario.choices[selectedId],
            allChoices: scenario.choices,
            selectedId: selectedId
        };

        // Lưu vào localStorage
        localStorage.setItem('user_last_result', JSON.stringify(userResult));

        // Điều hướng sang trang Result
        navigate('/result'); 
    };

    if (!scenario || !scenario.choices) {
        return <div className="question-page-container">Đang nạp tình huống...</div>;
    }

    const options = Object.keys(scenario.choices).map(key => ({
        id: key, 
        text: scenario.choices[key]?.text || ""
    }));

    const textToRead = `Câu hỏi: ${scenario.question}. ` + 
        options.map(opt => `Đáp án ${opt.id}: ${opt.text}`).join(". ");

    return (
        <div className="question-page-container">
            <div className="header-controls">
                <ReadAloudButton textToRead={textToRead} />
                <QuestionCounter current={1} total={1} />
            </div>

            <div className="main-content-layout">
                <div className="left-column">
                    <div className="question-card">
                        {scenario.question}
                    </div>

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

                    {/* 3. Thêm nút xác nhận để chuyển trang */}
                    <button 
                        className={`confirm-button ${selectedId ? 'active' : ''}`}
                        onClick={handleConfirm}
                    >
                        XÁC NHẬN
                    </button>
                </div>

                <div className="right-column">
                    <div className="character-frame">
                        <StoredCharacter />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionPage;