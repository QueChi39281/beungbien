import React from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import MusicButton from '../components/MusicButton';
import './StartPage.css';
import logoImg from '../assets/logo.png';

const StartPage = () => {
    const navigate = useNavigate();

    const handleFinished = () => {
        navigate('/userinfo');
    };

    return (
        <div className="start-page">
            <div className="music-btn-fixed">
                <MusicButton />
            </div>
            
            <div className="loading-wrapper">
                <div className="logo-container">
                    <img src={logoImg} alt="Logo" className="main-logo" />
                </div>
                
                <Loading onFinished={handleFinished} />
            </div>
        </div>
    );
};

export default StartPage;