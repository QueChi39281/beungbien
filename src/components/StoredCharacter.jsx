import React, { useState, useEffect } from 'react';
import namImg from '../assets/nam.png';
import nuImg from '../assets/nu.png';
import './StoredCharacter.css';

const StoredCharacter = ({ className = "" }) => {
    // Mặc định ban đầu là 'Nam'
    const [gender, setGender] = useState('Nam'); 

    useEffect(() => {
        const savedData = localStorage.getItem('selectedCharacter');
        
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                // Nếu có dữ liệu và có thuộc tính gender thì mới set, 
                // không thì vẫn giữ mặc định là 'Nam'
                if (parsed && parsed.gender) {
                    setGender(parsed.gender);
                }
            } catch (error) {
                console.error("Lỗi parse JSON, dùng nhân vật mặc định:", error);
                setGender('Nam');
            }
        } else {
            // Trường hợp không có localStorage: Ép về Nam cho chắc chắn
            setGender('Nam');
        }
    }, []);

    const imageSrc = gender === 'Nữ' ? nuImg : namImg;

    return (
        <div className={`character-container ${className}`}>
            <img 
                src={imageSrc} 
                alt={`Nhân vật ${gender}`} 
                className="character-img" 
                // Thêm thuộc tính này để nếu ảnh lỗi vẫn không làm vỡ layout
                onError={(e) => { e.target.src = namImg; }} 
            />
        </div>
    );
};

export default StoredCharacter;