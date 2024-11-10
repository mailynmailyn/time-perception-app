import React, { useState, useContext,  } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig'; // Ensure Firebase is configured and exported from here
import { collection, addDoc } from 'firebase/firestore';
import { AudioContext } from './AudioContext';

function Familiarity() {
  const [familiarity, setFamiliarity] = useState(null);
  const navigate = useNavigate();
  const { audios, currentAudioIndex, handleNextAudio } = useContext(AudioContext);

  // Safely access the current audio
  const currentAudio = audios[currentAudioIndex];

  const handleFamiliarityChange = (e) => {
    setFamiliarity(Number(e.target.value));
  };

  function saveFamiliarityToFirebase(userId, songId, versionId, familiarity) {
    // Reference to the 'Versions' subcollection within the specified user's song and version path
    const versionRef = collection(db, 'Users', userId, 'Songs', songId, 'Versions', versionId, 'Data');
  
    // Add a new document with the time data and a timestamp in the 'TimeEntries' collection for this version
    addDoc(versionRef, {
      familiarity
    })
    .then(() => {
      console.log("Data saved successfully!");
    })
    .catch((error) => {
      console.error("Error saving data:", error);
    });
  }

  const saveFamiliarity = async () => {
    if (familiarity === null) {
      alert("Please select a familiarity rating.");
      return;
    }

    saveFamiliarityToFirebase('mailyn', currentAudio.name, currentAudio.version, familiarity);

    handleNextAudio();

    navigate('/semanticdata');
  };

  return (
    <div>
      <h1>Familiarity</h1>
      <h2>Rate Your Familiarity with the Song</h2>
      <form>
        {[1, 2, 3, 4, 5].map((value) => (
          <label key={value} style={{ display: 'block', margin: '8px 0' }}>
            <input
              type="radio"
              name="familiarity"
              value={value}
              checked={familiarity === value}
              onChange={handleFamiliarityChange}
            />
            {value} - {["Not Familiar", "Slightly Familiar", "Somewhat Familiar", "Familiar", "Very Familiar"][value - 1]}
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

