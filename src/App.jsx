// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import InsuranceCalculator from './InsuranceCalculator';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Main Page */}
        <Route path="/" element={<MainPage />} />

        {/* Insurance Calculator Page */}
        <Route path="/insurance-calculator" element={<InsuranceCalculator />} />
      </Routes>
    </Router>
  );
};

export default App;