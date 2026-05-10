import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SummaryPage.css';
import StoredCharacter from '../components/StoredCharacter';

const SummaryPage = () => {
    const navigate = useNavigate();
    const [summary, setSummary] = useState({
        score: 0,
        maxScore: 0,
        level: 1,
        evaluation: ""
    });

    useEffect(() => {
        // 1. Lấy tổng điểm tích lũy từ LocalStorage
        const totalScore = parseInt(localStorage.getItem('total_score') || '0', 10);
        
        // 2. Lấy kho câu hỏi để tính toán các thông số
        const savedScenarios = localStorage.getItem('all_scenarios');
        const allScenarios = JSON.parse(savedScenarios || '[]');
        
        // 3. Tính điểm tối đa (Max Score) - Giả định mỗi câu tối đa 10 điểm
        const totalCount = allScenarios.length;
        const maxScore = totalCount * 10;

        // 4. Lấy thông tin Level hiện tại từ dữ liệu cấu hình của API
        // Thử lấy từ config của scenario đầu tiên, nếu không thấy thì mặc định là 1
        const currentLvl = allScenarios[0]?.config?.difficulty || 1;

        // 5. Logic đưa ra nhận xét thông minh dựa trên tỷ lệ điểm đạt được
        let evalText = "";
        const ratio = maxScore > 0 ? totalScore / maxScore : 0;

        if (ratio >= 0.8) {
            evalText = "🏆 Xuất sắc! Con đã nắm rất vững các quy tắc an toàn và biết cách bảo vệ bản thân mình rồi đấy! Hãy tiếp tục phát huy nhé.";
        } else if (ratio >= 0.5) {
            evalText = "🌟 Làm tốt lắm! Con đã biết cách ứng xử an toàn trong phần lớn tình huống. Hãy cẩn thận hơn một chút ở các lựa chọn khác nhé!";
        } else {
            evalText = "💪 Con đã rất cố gắng! Đừng buồn nhé, hãy cùng ba mẹ xem lại các tình huống để chúng mình biết cách bảo vệ bản thân tốt hơn.";
        }

        // Cập nhật State để hiển thị lên giao diện
        setSummary({
            score: totalScore,
            maxScore: maxScore,
            level: currentLvl,
            evaluation: evalText
        });
    }, []);

    /**
     * Xử lý khi nhấn nút Chơi tiếp: 
     * Dọn dẹp dữ liệu cũ để sẵn sàng cho một vòng chơi mới an toàn.
     */
    const handleRestart = () => {
        localStorage.removeItem('total_score');
        localStorage.removeItem('all_scenarios');
        localStorage.removeItem('current_question_index');
        localStorage.removeItem('user_last_result');
        
        navigate('/choice-level');
    };

    return (
        <div className="summary-page-container">
            <main className="summary-main-layout">
                {/* Cột bên trái: Hiển thị điểm số và nhận xét */}
                <div className="summary-left-column">
                    <div className="score-section">
                        <h2 className="score-title">Tổng điểm của con</h2>
                        <div className="score-card">
                            <span className="score-number">{summary.score}</span>
                            <span className="score-max">/ {summary.maxScore}</span>
                        </div>
                    </div>

                    <div className="summary-content-card">
                        <h3 className="summary-lvl-title">Kết quả Cấp độ {summary.level}</h3>
                        <p className="summary-text">{summary.evaluation}</p>
                    </div>

                    <div className="button-area">
                        <button className="play-next-btn" onClick={handleRestart}>
                            CHƠI TIẾP
                        </button>
                    </div>
                </div>

                {/* Cột bên phải: Hiển thị nhân vật đại diện */}
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