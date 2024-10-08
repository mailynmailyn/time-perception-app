// FullscreenComponent.js
import React from 'react';
import AudioPlayer from './AudioPlayer.js'; // Import your JavaScript function

const FullscreenComponent = () => {
  const goFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen().then(() => {
        return (
            <div>
              <AudioPlayer />
            </div>
          );
      }).catch(err => {
        console.error("Error attempting to enable fullscreen mode:", err);
      });
    }
  };

  return (
    <div>
      <h1>Welcome to Fullscreen Mode!</h1>
      <button onClick={goFullscreen}>Toggle Fullscreen</button>
    </div>
  );
};

export default FullscreenComponent;
