import React, { useState, useRef, useContext, useEffect } from 'react';
import { db } from '../firebaseConfig'; // Import your firebase config
import { setDoc, doc } from 'firebase/firestore';
import '../styling/audioplayer.css';
import { useNavigate } from 'react-router-dom';
import { AudioContext } from './AudioContext';

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const startTimeRef = useRef(null); 
  const [isLoaded, setIsLoaded] = useState(false); // State to track if audio is preloaded
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const { audios, currentAudioIndex, username } = useContext(AudioContext);

  // Safely access the current audio
  const currentAudio = audios[currentAudioIndex];

  // Preload audio when the component is mounted or when the current audio changes
  useEffect(() => {
    // Create a new Audio object for preloading
    audioRef.current = new Audio(currentAudio.url);
    audioRef.current.preload = 'auto'; // Preload the audio

    // When the audio is completely preloaded, set isLoaded to true
    audioRef.current.oncanplaythrough = () => {
      setIsLoaded(true); // Audio is ready to play
    };

     // Stop timer and navigate when audio ends naturally
     audioRef.current.onended = handleStop;

     // Cleanup audio object when the component unmounts or audio changes
     return () => {
       audioRef.current.pause();
       audioRef.current = null;
       setIsLoaded(false);
     };
  // eslint-disable-next-line
  }, [currentAudio.url]); // Only re-run when the current audio changes

  
  // Function to handle both manual stop and audio ended naturally
  const handleStop = () => {
    // Stop timer
    const endTime = Date.now();
    console.log(startTimeRef.current);
    console.log(endTime);
    const timeElapsed = (endTime - startTimeRef.current) / 1000; // in seconds
    setIsPlaying(false);

    // Pause the audio
    audioRef.current.pause();
    audioRef.current.currentTime = 0; // Reset time to start

    // Save to Firebase
    saveTimeToFirebase(username, currentAudio.id, currentAudio.name, currentAudio.version, timeElapsed);

    // Navigate to a different page
    navigate('/familiarity');
  };

  const handleAudioStartStop = () => {
    if (!isPlaying) {
      // Start timer
      startTimeRef.current = Date.now();
      setIsPlaying(true);
      // Start audio playback
      audioRef.current.play().catch(error => {
        console.error('Playback failed:', error);
      });
    } else {
      handleStop();
    }
  };

  function saveTimeToFirebase(userId, songId, songName, versionId, time) {
    // Reference to the 'Versions' subcollection within the specified user's song and version path
    const versionRef = doc(db, 'Users', userId, 'SongData', songId);

    // Save time data to Firebase
    setDoc(versionRef, {
      song: songName,
      version: versionId,
      time: time + 's',
      songId: songId,
      user: userId
    })
      .then(() => {
        console.log("Data saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  }

  return (
    <div className="audio-container">
      <h3>{currentAudio.id}</h3>
      {isLoaded ? (
        <button
          onClick={handleAudioStartStop}
          className={isPlaying ? 'active' : ''} // Apply 'active' class based on state
        >
          {isPlaying ? 'Stop' : 'Start'}
        </button>
      ) : (
        <p>Loading audio...</p> // Show loading message while the audio is preloading
      )}
    </div>
  );
}

export default AudioPlayer;
