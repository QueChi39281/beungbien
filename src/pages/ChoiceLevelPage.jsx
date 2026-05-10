import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChoiceLevelPage.css';
import StoredCharacter from '../components/StoredCharacter';
import logoImg from '../assets/logo.png';
import { parseScenarioStream } from '../services/scenarioService';

const ChoiceLevelPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState(null);

    const levels = [1, 2, 3, 4, 5];

    /**
     * Hàm xử lý khi người dùng chọn một cấp độ
     * @param {number} level - Cấp độ được chọn (1-5)
     */
    const handleLevelSelect = async (level) => {
        setSelectedLevel(level);
        setIsLoading(true);

        // --- 1. DỌN DẸP VÀ KHỞI TẠO BỘ NHỚ TẠM ---
        // Reset điểm về 0 và chỉ số câu hỏi về 0 cho lượt chơi mới
        localStorage.setItem('total_score', '0'); 
        localStorage.setItem('current_question_index', '0');
        
        // Xóa dữ liệu cũ để tránh xung đột dữ liệu giữa các lần chơi
        localStorage.removeItem('all_scenarios');
        localStorage.removeItem('user_last_result');
        localStorage.removeItem('current_scenarios');

        // --- 2. KIỂM TRA THÔNG TIN BÉ ---
        const savedChild = JSON.parse(localStorage.getItem('temp_child_data'));
        if (!savedChild) {
            alert("Không tìm thấy thông tin bé, vui lòng quay lại nhập liệu.");
            navigate('/userinfo');
            return;
        }

        // --- 3. CHUẨN BỊ DỮ LIỆU GỬI ĐẾN SERVER ---
        const finalPayload = {
            child: {
                name: savedChild.name,
                age: Number(savedChild.age),
                gender: savedChild.gender,
                location: savedChild.location,
                notes: savedChild.notes || ""
            },
            config: {
                // Công thức: Level 1 = 3 câu, Level 2 = 6 câu...
                total: level * 3, 
                difficulty: level
            }
        };

        try {
            // --- 4. GỌI API ĐỂ TẠO TÌNH HUỐNG (STREAM) ---
            const response = await fetch('http://127.0.0.1:8000/api/v1/scenarios/generate-stream', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalPayload),
            });

            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error("Hệ thống AI đang bận (Hết hạn mức). Vui lòng đợi ít phút.");
                }
                throw new Error("Lỗi kết nối máy chủ.");
            }

            // --- 5. XỬ LÝ DỮ LIỆU TRẢ VỀ ---
            // parseScenarioStream trả về mảng các câu hỏi đã được xử lý từ stream
            const allScenarios = await parseScenarioStream(response);

            // Kiểm tra lỗi hạn mức từ phía AI
            if (allScenarios?.error === "QUOTA_EXCEEDED") {
                alert("Hiện tại AI đã hết lượt sử dụng miễn phí trong ngày. Vui lòng thử lại sau.");
                return;
            }

            // Kiểm tra tính hợp lệ của danh sách câu hỏi
            if (Array.isArray(allScenarios) && allScenarios.length > 0) {
                // Lưu danh sách câu hỏi vào "kho" để các trang sau bóc tách
                localStorage.setItem('all_scenarios', JSON.stringify(allScenarios));

                // Chuyển hướng sang màn hình câu hỏi
                navigate('/question'); 
            } else {
                alert("Máy chủ không trả về dữ liệu hợp lệ, vui lòng thử lại.");
            }

        } catch (error) {
            console.error("Lỗi quá trình khởi tạo:", error);
            alert(error.message || "Đã xảy ra lỗi không xác định.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="choice-level-container">
            {/* Màn hình Loading khi đang chờ AI tạo nội dung */}
            {isLoading && (
                <div className="loading-overlay">
                    <div className="loading-content">
                        <img src={logoImg} alt="Loading" className="loading-logo-spin" />
                        <p className="loading-text">Đang tạo chuỗi tình huống an toàn cho bé...</p>
                    </div>
                </div>
            )}

            <div className="content-wrapper">
                {/* Khu vực chọn Level */}
                <div className="level-selection-area">
                    <h1 className="title">CHỌN CẤP ĐỘ</h1>
                    <div className="levels-grid">
                        {levels.map((lvl) => (
                            <button 
                                key={lvl} 
                                className={`level-circle ${selectedLevel === lvl ? 'active' : ''}`}
                                onClick={() => handleLevelSelect(lvl)}
                                disabled={isLoading}
                            >
                                Lvl {lvl}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Khu vực hiển thị nhân vật đại diện */}
                <div className="character-display">
                    <div className="character-frame">
                        <StoredCharacter />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChoiceLevelPage;