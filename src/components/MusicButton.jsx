import { useState, useRef } from 'react';
import './MusicButton.css';

// Import tài nguyên từ thư mục assets
import icon1 from '../assets/icon_nhac.png';
import icon2 from '../assets/icon_nhac2.png';
import musicFile from '../assets/music.mp3';

function MusicButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHover, setIsHover] = useState(false); // Thêm state để theo dõi hover
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-btn-container">
      {/* Gán file nhạc vào src */}
      <audio ref={audioRef} src={musicFile} loop />

      <button 
        className="music-toggle-btn" 
        onClick={toggleMusic}
        onMouseEnter={() => setIsHover(true)}   // Khi chuột đi vào
        onMouseLeave={() => setIsHover(false)}  // Khi chuột đi ra
      >
        <img 
          src={isHover ? icon2 : icon1} // Đổi icon dựa trên state hover
          alt="Music Icon" 
          className="music-icon-img"
        />
        
        <span className="status-text">
          {isPlaying ? 'ON' : 'OFF'}
        </span>
      </button>
    </div>
  );
}

export default MusicButton;