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

    const handleLevelSelect = async (level) => {
        setSelectedLevel(level);
        setIsLoading(true);

        const savedChild = JSON.parse(localStorage.getItem('temp_child_data'));
        if (!savedChild) {
            alert("Không tìm thấy thông tin bé, vui lòng quay lại nhập liệu.");
            navigate('/userinfo');
            return;
        }

        const finalPayload = {
            child: {
                name: savedChild.name,
                age: Number(savedChild.age),
                gender: savedChild.gender,
                location: savedChild.location,
                notes: savedChild.notes || ""
            },
            config: {
                total: level * 3,
                difficulty: level
            }
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/scenarios/generate-stream', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalPayload),
            });

            if (!response.ok) {
                if (response.status === 429) throw new Error("Hệ thống AI đang bận (Hết hạn mức).");
                throw new Error("Lỗi kết nối máy chủ.");
            }

            const scenarioData = await parseScenarioStream(response);

            if (scenarioData?.error === "QUOTA_EXCEEDED") {
                alert("Hiện tại AI đã hết lượt sử dụng miễn phí trong ngày. Vui lòng thử lại sau.");
            } else if (scenarioData && scenarioData.question) {
                localStorage.setItem('current_scenarios', JSON.stringify(scenarioData));
                navigate('/question'); 
            } else {
                alert("Không thể tạo tình huống vào lúc này, vui lòng thử lại.");
            }

        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="choice-level-container">
            {isLoading && (
                <div className="loading-overlay">
                    <div className="loading-content">
                        <img src={logoImg} alt="Loading" className="loading-logo-spin" />
                        <p className="loading-text">Đang tạo tình huống an toàn cho bé...</p>
                    </div>
                </div>
            )}

            <div className="content-wrapper">
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