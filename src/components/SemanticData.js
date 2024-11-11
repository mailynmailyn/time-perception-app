import React, { useState, useContext,  } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig'; // Ensure Firebase is configured and exported from here
import { doc, updateDoc } from 'firebase/firestore';
import { AudioContext } from './AudioContext';

function SemanticData() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({
    answer1: '',
    answer2: '',
    answer3: ''
  });

  const { audios, currentAudioIndex, handleNextAudio, username } = useContext(AudioContext);

  // Safely access the current audio
  const currentAudio = audios[currentAudioIndex];

  const userId = username;
  const songId = currentAudio.name;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      updateDoc(doc(db, 'Users', userId, 'SongData', songId), {
        answer1: answers.answer1,
        answer2: answers.answer2,
        answer3: answers.answer3
      });
      alert("Your answers have been saved!");
      setAnswers({ answer1: '', answer2: '', answer3: '' }); // Clear the form after submission

      handleNextAudio();
      
      if(currentAudioIndex === (audios.length-1)){
        navigate('/results');
        console.log(currentAudioIndex);
      }
      else{
        navigate('/audioplayer');
      }
      

    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to save answers.");
    }
  };

  return (
    <div>
      <h1>Semantic Question Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Question 1: What is your favorite genre of music?
          <input
            type="text"
            name="answer1"
            value={answers.answer1}
            onChange={handleChange}
          />
        </label><br /><br />

        <label>
          Question 2: How does this genre make you feel?
          <input
            type="text"
            name="answer2"
            value={answers.answer2}
            onChange={handleChange}
          />
        </label><br /><br />

        <label>
          Question 3: Do you associate this music with any specific memory or event?
          <input
            type="text"
            name="answer3"
            value={answers.answer3}
            onChange={handleChange}
          />
        </label><br /><br />

        <button type="submit">Submit Answers</button>
      </form>
    </div>
  );
}

export default SemanticData;
