import { useState, useEffect } from 'react';
import './Loading.css';

// 1. Phải thêm { onFinished } vào đây để nhận "lệnh" từ StartPage
function Loading({ onFinished }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30); // Tốc độ nhanh chậm tùy má chỉnh

    return () => clearInterval(interval);
  }, []);

  // 2. Thêm useEffect này để theo dõi khi nào xong thì báo cho StartPage
  useEffect(() => {
    if (progress === 100) {
      // Đợi thêm 300ms cho thanh bar đầy hẳn nhìn cho đẹp rồi mới báo xong
      const timer = setTimeout(() => {
        if (onFinished) onFinished(); 
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [progress, onFinished]);

  return (
    <div className="loading-container">
      <div 
        className="loading-bar" 
        style={{ width: `${progress}%` }} 
      />
      {/* Má có thể hiện số % nếu muốn, không thì thôi */}
      <div style={{textAlign: 'center', marginTop: '10px', color: '#00500A', fontWeight: 'bold'}}>
        {progress}%
      </div>
    </div>
  );
}

export default Loading;