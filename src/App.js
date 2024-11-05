import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AudioPlayer from './components/AudioPlayer'; // Adjust the path if necessary
import Instructions from './components/Instructions';
import UserInfo from './components/UserInfo';
import SemanticData from './components/SemanticData';
import Results from './components/Results';

function App() {
  return (
    <Router>
      {/* <nav>
        <Link to="/audioplayer">AudioPlayer</Link>
        <Link to="/instructions">Instructions</Link>
      </nav> */}

      <Routes>
        <Route path="/" element={<UserInfo />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/audioplayer" element={<AudioPlayer />} />
        <Route path="/semanticdata" element={<SemanticData />} />
        <Route path="/restils" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
