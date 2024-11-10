import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AudioPlayer from './components/AudioPlayer'; // Adjust the path if necessary
import Instructions from './components/Instructions';
// import UserInfo from './components/UserInfo';
import SemanticData from './components/SemanticData';
import Familiarity from './components/Familiarity';
import Results from './components/Results';
import { AudioProvider } from './components/AudioContext';

function App() {
  return (
    <AudioProvider>
      <Router>
        {/* <nav>
          <Link to="/audioplayer">AudioPlayer</Link>
          <Link to="/instructions">Instructions</Link>
        </nav> */}
    
        <Routes>
          <Route path="/" element={<UserInfo />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/audioplayer" element={<AudioPlayer />} />
          <Route path="/familiarity" element={<Familiarity />} />
          <Route path="/semanticdata" element={<SemanticData />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </Router>
    </AudioProvider>  
  );
}

export default App;
