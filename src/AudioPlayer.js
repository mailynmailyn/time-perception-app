import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig'; // Import your Firestore setup
import { collection, addDoc } from 'firebase/firestore';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio('path_to_your_audio_file.mp3')); // Replace with your audio file path
  const [startTime, setStartTime] = useState(null);

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
      await addDoc(collection(db, 'audioRecords'), {
        elapsedTime: elapsedTime, // Store elapsed time in milliseconds
        timestamp: new Date(),
      });
      console.log('Elapsed time saved:', elapsedTime);
    } catch (error) {
      console.error('Error saving elapsed time:', error);
    }
  };

  useEffect(() => {
    // Clean up audio on component unmount
    return () => {
      audio.pause();
      audio.src = ""; // Reset audio source
    };
  }, [audio]);

  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={toggleAudio}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  button: {
    padding: '15px 30px',
    fontSize: '20px',
    cursor: 'pointer',
  },
};

export default AudioPlayer;