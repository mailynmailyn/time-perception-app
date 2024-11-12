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
      <p>Please complete this experiment on a laptop or computer, using headphones, and in a quiet, distraction 
        free space. Set your volume to a moderate level, one that you won’t have to adjust. </p>
      <p>You will be played a series of recordings. Click the button in the middle to begin each recording, and then click the same button again 
        when you believe 60s has passed. Please do not attempt to count the seconds or look at any sort of time-keeping device; 
        rely on your intuition. </p>
      <p>After each recording, you will be asked a series of questions regarding what you have just heard. </p>
      <p>Please answer in short phrases. At the end, you will be able to see how you performed!  </p>
      <button onClick={handleProceed} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Proceed
      </button>
    </div>
  );
}

export default Instructions;
