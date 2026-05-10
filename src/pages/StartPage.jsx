import React from 'react';
import { useNavigate } from 'react-router-dom'; // Dùng để chuyển trang
import Loading from '../components/Loading';
import MusicButton from '../components/MusicButton';
import './StartPage.css';
import logoImg from '../assets/logo.png';

const StartPage = () => {
    const navigate = useNavigate();

    // Hàm này kích hoạt khi thanh Loading báo xong
    const handleFinished = () => {
        // Chuyển hướng sang route /userinfo
        navigate('/userinfo');
    };

    return (
        <div className="start-page">
            {/* Nút nhạc giữ nguyên */}
            <div className="music-btn-fixed">
                <MusicButton />
            </div>
            
            {/* Luôn hiện Loading cho đến khi chuyển trang */}
            <div className="loading-wrapper">
                {/* Logo giữ nguyên vị trí cũ */}
                <div className="logo-container">
                    <img src={logoImg} alt="Logo" className="main-logo" />
                </div>
                
                {/* Gọi hàm chuyển trang khi hoàn tất */}
                <Loading onFinished={handleFinished} />
            </div>
        </div>
    );
};

export default StartPage;