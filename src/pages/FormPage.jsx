import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Thêm useNavigate
import './FormPage.css';
import MusicButton from '../components/MusicButton';

// Import ảnh
import namImg from '../assets/nam.png';
import nuImg from '../assets/nu.png';
import iconTrai1 from '../assets/icon_trai.png';
import iconTrai2 from '../assets/icon_trai2.png';
import iconPhai1 from '../assets/icon_phai.png';
import iconPhai2 from '../assets/icon_phai2.png';

const FormPage = () => {
    const navigate = useNavigate(); // Khởi tạo điều hướng
    const [formData, setFormData] = useState({ name: '', age: '', location: 'Nông thôn' });
    const [gender, setGender] = useState('Nam'); 
    const [hoverBtn, setHoverBtn] = useState('');

    const toggleGender = () => {
        setGender(prev => prev === 'Nam' ? 'Nữ' : 'Nam');
    };

    // LOGIC CHÍNH: Lưu thông tin và chuyển trang
    const handleStart = () => {
        // Kiểm tra validation nhẹ
        if (!formData.name || !formData.age) {
            alert("Nhập tên với tuổi đã nhé!");
            return;
        }

        // Tạo cấu trúc object child khớp hoàn toàn với yêu cầu của API sau này
        const childData = {
            name: formData.name,
            age: parseInt(formData.age), // Ép kiểu số
            gender: gender, // Lấy giá trị 'Nam' hoặc 'Nữ' đang hiển thị
            location: formData.location,
            notes: "" // Để trống hoặc thêm field nếu cần
        };
        
        console.log("Đã lưu tạm thông tin bé:", childData);
        
        // 1. Lưu vào localStorage để trang SelectLevel lấy ra dùng
        localStorage.setItem('temp_child_data', JSON.stringify(childData));
        
        // 2. Lưu riêng gender để các trang kết quả hiển thị đúng ảnh
        localStorage.setItem('selectedCharacter', JSON.stringify({ gender }));

        // 3. Điều hướng sang trang chọn Level
        navigate('/choice-level'); 
    };

    return (
        <div className="form-page">
            <div className="music-btn-fixed">
                <MusicButton />
            </div>

            <div className="left-section">
                <div className="input-group">
                    <label className="label-text">Tên người dùng</label>
                    <input 
                        type="text"
                        className="input-field" 
                        placeholder="Nhập tên..."
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    />
                </div>

                <div className="input-group">
                    <label className="label-text">Tuổi</label>
                    <input 
                        type="text" 
                        className="input-field" 
                        placeholder="5"
                        maxLength="2"
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value.replace(/\D/g,'')})} 
                    />
                </div>

                <div className="input-group">
                    <label className="label-text">Địa điểm</label>
                    <select 
                        className="input-field input-location"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                    >
                        <option value="Nông thôn">Nông thôn</option>
                        <option value="Thành thị">Thành thị</option>
                        {/* <option value="Công viên">Công viên</option>
                        <option value="Trường học">Trường học</option> */}
                    </select>
                </div>

                <div className="btn-start-container">
                    <button className="btn-start" onClick={handleStart}>
                        Bắt đầu
                    </button>
                </div>
            </div>

            <div className="right-section">
                <div className="character-box">
                    <img 
                        src={gender === 'Nam' ? namImg : nuImg} 
                        alt="Avatar" 
                        className="avatar-display" 
                    />
                </div>

                <div className="nav-buttons">
                    <button 
                        className="circle-btn" 
                        onMouseEnter={() => setHoverBtn('trai')} 
                        onMouseLeave={() => setHoverBtn('')}
                        onClick={toggleGender}
                    >
                        <img src={hoverBtn === 'trai' ? iconTrai2 : iconTrai1} alt="Trái" />
                    </button>
                    
                    <button 
                        className="circle-btn"
                        onMouseEnter={() => setHoverBtn('phai')} 
                        onMouseLeave={() => setHoverBtn('')}
                        onClick={toggleGender}
                    >
                        <img src={hoverBtn === 'phai' ? iconPhai2 : iconPhai1} alt="Phải" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormPage;