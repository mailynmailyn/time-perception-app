import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig'; // Import your Firestore setup
import { collection, addDoc } from 'firebase/firestore';
import audioFile from './audio_clips/bad_sneakers.mp3';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(audioFile)); // Replace with your audio file path
  const [startTime, setStartTime] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleAudio = () => {
    if (isPlaying) {
      // Pause the audio
      audio.pause();
      // Calculate elapsed time
      const elapsedTime = Date.now() - startTime;
      saveElapsedTime(elapsedTime);
    } else {
      // Play the audio
      audio.play();
      // Set start time
      setStartTime(Date.now());
    }
    setIsPlaying(!isPlaying);
  };

  const saveElapsedTime = async (elapsedTime) => {
    try {
      await addDoc(collection(db, 'audioRecords', 'bad sneakers', 'mai'), {
        elapsedTime: elapsedTime / 1000, // Store elapsed time in seconds
        timestamp: new Date(),
      });
      console.log('Elapsed time saved:', elapsedTime);
    } catch (error) {
      console.error('Error saving elapsed time:', error);
    }
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    } else {
      document.documentElement.requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch(err => {
          console.error("Error attempting to enable fullscreen mode:", err);
        });
    }
  };

  useEffect(() => {
    // Add event listener for fullscreen change
    const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
      };
  
      document.addEventListener('fullscreenchange', handleFullscreenChange);

    // Clean up audio on component unmount
    return () => {
      audio.pause();
      audio.src = ""; // Reset audio source
    };
  }, [audio]);

  return (
    <div style={styles.container}>
      <button style={styles.fullscreenButton} onClick={toggleFullscreen}>
        {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
      </button>
      {isFullscreen && (
        <button style={styles.button} onClick={toggleAudio}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  button: {
    padding: '15px 30px',
    fontSize: '20px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  fullscreenButton: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default AudioPlayer;
