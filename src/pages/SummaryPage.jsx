import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SummaryPage.css';
import StoredCharacter from '../components/StoredCharacter';


const SummaryPage = () => {
    const navigate = useNavigate();

    const summaryData = {
        score: 25,
        level: 1,
        description: "Bạn đã hoàn thành rất tốt các tình huống ứng xử khi gặp người lạ. Hãy tiếp tục phát huy ở các cấp độ tiếp theo nhé!"
    };

    return (
        <div className="summary-page-container">
            <main className="summary-main-layout">
                {/* Cột trái chứa Điểm và Tóm tắt */}
                <div className="summary-left-column">
                    <div className="score-section">
                        <h2 className="score-title">Điểm của bạn</h2>
                        <div className="score-card">
                            <span className="score-number">{summaryData.score}</span>
                        </div>
                    </div>

                    <div className="summary-content-card">
                        <h3 className="summary-lvl-title">Tóm tắt LV{summaryData.level}</h3>
                        <p className="summary-text">{summaryData.description}</p>
                    </div>

                    <div className="button-area">
                        <button className="play-next-btn" onClick={() => navigate('/choice-level')}>
                            Chơi tiếp
                        </button>
                    </div>
                </div>

                {/* Cột phải chứa Nhân vật (Y hệt ResultPage) */}
                <div className="summary-right-column">
                    <div className="summary-character-frame">
                        <StoredCharacter />
                    </div>
                    
                </div>
            </main>
        </div>
    );
};

export default SummaryPage;