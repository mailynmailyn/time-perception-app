import React from 'react';
import { useNavigate } from 'react-router-dom';

function Instructions() {
  const navigate = useNavigate();

  const handleProceed = () => {
    // Trigger fullscreen mode
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari & Opera
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
      document.documentElement.msRequestFullscreen();
    }

    // Navigate to the next page
    navigate('/audioplayer');
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Instructions</h1>
      <p>Please read the instructions carefully before proceeding to the next page.</p>
      <button onClick={handleProceed} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Proceed
      </button>
    </div>
  );
}

export default Instructions;
