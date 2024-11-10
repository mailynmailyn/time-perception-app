import React, { useState, useRef, useContext } from 'react';
import { db } from '../firebaseConfig'; // Import your firebase config
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import comedownstudio from '../audio_clips/come_down_studio.wav';
// import pinkponystudio from '../audio_clips/pink_pony.wav';
// import zombiegirltd from '../audio_clips/zombie_girl_td.wav';
import '../styling/audioplayer.css';
import { useNavigate } from 'react-router-dom';
import { AudioContext } from './AudioContext';


// const audios = [
//   { id: 'Audio A', name: 'Pink Pony Club', version: 'Studio', url: pinkponystudio },
//   { id: 'Audio B', name: 'Come Down', version: 'Studio', url: comedownstudio },
//   { id: 'Audio C', name: 'Zombie Girl', version: 'Tiny Desk', url: zombiegirltd },
// ];


function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState(null);
  // const [elapsedTime, setElapsedTime] = useState(0);
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const { audios, currentAudioIndex } = useContext(AudioContext);

  // Safely access the current audio
  const currentAudio = audios[currentAudioIndex];

  const handleAudioStartStop = () => {
   
    if (!isPlaying) {
      // Start timer
      setStartTime(Date.now());
      setIsPlaying(true);
      // Start audio playback
      // Create a new Audio object and store it in the ref
      audioRef.current = new Audio(currentAudio.url);
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
      saveTimeToFirebase('mailyn', currentAudio.name, currentAudio.version, timeElapsed);

      // handleNextAudio();
      // Navigate to a different page
      navigate('/familiarity');

    }
  };

  function saveTimeToFirebase(userId, songId, versionId, time) {
    // Reference to the 'Versions' subcollection within the specified user's song and version path
    const versionRef = collection(db, 'Users', userId, 'Songs', songId, 'Versions', versionId, 'Data');
  
    // Add a new document with the time data and a timestamp in the 'TimeEntries' collection for this version
    addDoc(versionRef, {
      time,
      timestamp: serverTimestamp(),
    })
    .then(() => {
      console.log("Data saved successfully!");
    })
    .catch((error) => {
      console.error("Error saving data:", error);
    });
  }
  

  // const handleNextAudio = () => {
  //   setCurrentAudioIndex((prevIndex) => (prevIndex + 1) % audios.length);
  //   // setElapsedTime(0); // Reset elapsed time
  //   setIsPlaying(false); // Reset playing status
  // };

  return (
    <div className = "audio-container">
      <h3>{currentAudio.id}</h3>
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
