import React, { useState, useRef, useContext, useEffect } from 'react';
import { db } from '../firebaseConfig'; // Import your firebase config
import { setDoc, doc } from 'firebase/firestore';
import '../styling/audioplayer.css';
import { useNavigate } from 'react-router-dom';
import { AudioContext } from './AudioContext';

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState(null);
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
  }, [currentAudio.url]); // Only re-run when the current audio changes

  const handleAudioStartStop = () => {
    if (!isPlaying) {
      // Start timer
      setStartTime(Date.now());
      setIsPlaying(true);
      // Start audio playback
      audioRef.current.play().catch(error => {
        console.error('Playback failed:', error);
      });
    } else {
      // Stop timer
      const endTime = Date.now();
      const timeElapsed = (endTime - startTime) / 1000; // in seconds
      setIsPlaying(false);

      // Pause the audio
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Optional: reset time to start

      // Save to Firebase
      saveTimeToFirebase(username, currentAudio.name, currentAudio.version, timeElapsed);

      // Navigate to a different page
      navigate('/familiarity');
    }
  };

  function saveTimeToFirebase(userId, songId, versionId, time) {
    // Reference to the 'Versions' subcollection within the specified user's song and version path
    const versionRef = doc(db, 'Users', userId, 'SongData', songId);

    // Save time data to Firebase
    setDoc(versionRef, {
      song: songId,
      version: versionId,
      time: time + 's',
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
      <button
        onClick={handleAudioStartStop}
        className={isPlaying ? 'active' : ''} // Apply 'active' class based on state
      >
        {isPlaying ? 'Stop' : 'Start'}
      </button>
    </div>
  );
}

export default AudioPlayer;
