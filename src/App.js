import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DeepSeekVisualization from './DeepSeekVisualization';
import TransformerSummary from './TransformerSummary';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<DeepSeekVisualization />} />
        <Route path="/transformer" element={<TransformerSummary />} />
      </Routes>
    </Router>
  );
}

export default App;