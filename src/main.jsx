// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import { BrowserRouter } from 'react-router-dom';
// import './App.css'; 

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; 
import { BrowserRouter } from 'react-router-dom';

console.log("--- Đang khởi động React ---");

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

try {
    root.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    console.log("--- Đã gọi lệnh render App thành công ---");
} catch (error) {
    console.error("Lỗi khi render App:", error);
}