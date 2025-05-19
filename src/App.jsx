import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RegisterGame from './pages/RegisterGame';
import Statistics from './pages/Statistics';
import Navbar from './components/Navbar';
import AccessibilityButtons from './components/AccessibilityButtons';

function App() {
  return (
    <BrowserRouter basename="/sistema-handebol-novo">
      <AccessibilityButtons />
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterGame />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
