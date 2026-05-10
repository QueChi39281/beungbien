// import { Routes, Route } from 'react-router-dom';
// import './App.css';

// import SummaryPage from './pages/SummaryPage';

// import StartPage from './pages/StartPage';

// import FormPage from './pages/FormPage';

// import QuestionPage from './pages/QuestionPage';

// import ChoiceLevelPage from './pages/ChoiceLevelPage';

// import ResultPage from './pages/ResultPage';

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<StartPage />} /> 
//       <Route path="/userinfo" element={<FormPage />} /> 
//       <Route path="/question" element={<QuestionPage />} /> 
//       <Route path="/summary" element={<SummaryPage />} />
//       <Route path="/choice-level" element={<ChoiceLevelPage />} />
//       <Route path="/result" element={<ResultPage />} /> 
//     </Routes>
//   );
// }

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import FormPage from './pages/FormPage';
import QuestionPage from './pages/QuestionPage';
import ChoiceLevelPage from './pages/ChoiceLevelPage';
import ResultPage from './pages/ResultPage';
import SummaryPage from './pages/SummaryPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/userinfo" element={<FormPage />} />
      <Route path="/question" element={<QuestionPage />} />
      <Route path="/choice-level" element={<ChoiceLevelPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/summary" element={<SummaryPage />} />
    </Routes>
  );
}

export default App;