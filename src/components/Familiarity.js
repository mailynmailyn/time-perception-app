import React, { useState, useContext,  } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig'; // Ensure Firebase is configured and exported from here
import { updateDoc, doc } from 'firebase/firestore';
import { AudioContext } from './AudioContext';

function Familiarity() {
  const [familiarity, setFamiliarity] = useState(null);
  const navigate = useNavigate();
  const { audios, currentAudioIndex, username } = useContext(AudioContext);

  // Safely access the current audio
  const currentAudio = audios[currentAudioIndex];

  const handleFamiliarityChange = (e) => {
    setFamiliarity(Number(e.target.value));
  };

  function saveFamiliarityToFirebase(userId, songId, familiarity) {
    // Reference to the 'Versions' subcollection within the specified user's song and version path
    const versionRef = doc(db, 'Users', userId, 'SongData', songId);
  
    // Add a new document with the time data and a timestamp in the 'TimeEntries' collection for this version
    updateDoc(versionRef, {
      familiarity: familiarity
    })
    .then(() => {
      console.log("Data saved successfully!");
    })
    .catch((error) => {
      console.error("Error saving data:", error);
    });
  }

  const saveFamiliarity = () => {
    if (familiarity === null) {
      alert("Please select a familiarity rating.");
      return;
    }

    saveFamiliarityToFirebase(username, currentAudio.id, familiarity);

    navigate('/semanticdata');
  };

  return (
    <div>
      <h3>Rate your familiarity with the song</h3>
      <form>
        {[1, 2, 3, 4, 5].map((value) => (
          <label key={value} style={{ display: 'flex', margin: '15px' }}>
            <input
              type="radio"
              name="familiarity"
              value={value}
              checked={familiarity === value}
              onChange={handleFamiliarityChange}
            />
            <span>{value} - {["Not Familiar", "Slightly Familiar", "Familiar", "Very Familiar", "Extremely Familiar"][value - 1]}</span>
        {/* Subtitles below the main label */}
        <span style={{ color: '#777' }}>
          {[" (No knowledge of the song)", " (Heard it once or twice)", " (Familiar with the melody)", " (Know the song well)", " (Very familiar, almost every detail)"][value - 1]}
        </span>
        </label>
        ))}
        <button type="button" onClick={saveFamiliarity} style={{ marginTop: '20px' }}>
          Proceed
        </button>
      </form>
    </div>
  );
}

export default Familiarity;

