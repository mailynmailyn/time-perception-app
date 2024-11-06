import React, { useState, useRef } from 'react';
import { db } from '../firebaseConfig'; // Import your firebase config
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import comedownstudio from '../audio_clips/come_down_studio.wav';
import pinkponystudio from '../audio_clips/pink_pony.wav';
import zombiegirltd from '../audio_clips/zombie_girl_td.wav';
import '../styling/audioplayer.css';

const audios = [
  { id: 'Audio A', url: pinkponystudio },
  { id: 'Audio B', url: comedownstudio },
  { id: 'Audio C', url: zombiegirltd },
];


function AudioPlayer() {
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState(null);
  // const [elapsedTime, setElapsedTime] = useState(0);
  const audioRef = useRef(null);
  

  const handleAudioStartStop = () => {
   
    if (!isPlaying) {
      // Start timer
      setStartTime(Date.now());
      setIsPlaying(true);
      // Start audio playback
      // Create a new Audio object and store it in the ref
      audioRef.current = new Audio(audios[currentAudioIndex].url);
      audioRef.current.play().catch(error => {
        console.error('Playback failed:', error);
      });
    } else {
      // Stop timer
      const endTime = Date.now();
      const timeElapsed = (endTime - startTime) / 1000; // in seconds
      // setElapsedTime(timeElapsed);
      setIsPlaying(false);

       // Pause the audio
      if (audioRef.current) {
        audioRef.current.pause(); // Pause the audio
        audioRef.current.currentTime = 0; // Optional: reset time to start
      }

      // Save to Firebase
      saveTimeToFirebase(audios[currentAudioIndex].id, timeElapsed);

      handleNextAudio();

    }
  };

  function saveTimeToFirebase(audioId, time) {
    const audioTimesRef = collection(db, 'audioTimes'); // Reference to 'audioTimes' collection
    
    addDoc(audioTimesRef, {
      audioId,
      time,
      timestamp: serverTimestamp(),
    }).then(() => {
      console.log("Data saved successfully!");
    }).catch((error) => {
      console.error("Error saving data:", error);
    });
  }
  

  const handleNextAudio = () => {
    setCurrentAudioIndex((prevIndex) => (prevIndex + 1) % audios.length);
    // setElapsedTime(0); // Reset elapsed time
    setIsPlaying(false); // Reset playing status
  };

  return (
    <div className = "audio-container">
      <h3>{audios[currentAudioIndex].id}</h3>
      <button onClick={handleAudioStartStop}
        className={isPlaying ? 'active' : ''} // Apply 'active' class based on state
        >
        {isPlaying ? 'Stop' : 'Start'}
      </button>
      {/* <button className="next-audio" onClick={handleNextAudio}>Next Audio</button> */}
    </div>
  );
}

export default AudioPlayer;
