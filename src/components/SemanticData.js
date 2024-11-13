import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { AudioContext } from './AudioContext';

function SemanticData() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({
    answer1: '',
    answer2: '',
  });

  const questions = [
    {question: 'What features of the music stood out the most to you?', example: 'ie. aspects of instruments, speed, voice...'},
    {question: 'What features of the sound quality stood out the most to you?', example: 'ie. sense of clarity, balance, ideas of space...'},
    {question: 'How did it make you feel?', example: 'ie. evoked emotions or actions...'}
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { audios, currentAudioIndex, handleNextAudio, username } = useContext(AudioContext);

  // Safely access the current audio
  const currentAudio = audios[currentAudioIndex];
  const userId = username;
  const songId = currentAudio.id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!answers.answer1 || !answers.answer2) {
      alert("Please ensure all fields are filled.");
      return;
    }

    try {
      // Save the answers for the current question in the 'SemanticQuestions' collection
      await setDoc(doc(db, 'Users', userId, 'SongData', songId, 'SemanticQuestions', currentQuestionIndex.toString()), {
        question: questions[currentQuestionIndex].question,
        answer1: answers.answer1,
        answer2: answers.answer2,
        user: userId,
        songId: songId
      });

      // Clear the answers for the next question
      setAnswers({ answer1: '', answer2: ''});

      // Move to the next question or audio player/results if all questions answered
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Move to the next audio if available or to results if last audio
        handleNextAudio();
        if (currentAudioIndex === audios.length - 1) {
          navigate('/results');
        } else {

          // Trigger fullscreen mode
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
          } else if (document.documentElement.mozRequestFullScreen) { // Firefox
            document.documentElement.mozRequestFullScreen();
          } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari & Opera
            document.documentElement.webkitRequestFullscreen();
          } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
            document.documentElement.msRequestFullscreen();
          }
          navigate('/audioplayer');
        }
      }
    } catch (error) {
      console.error("Error saving document: ", error);
      alert("Failed to save answers.");
    }
  };

  return (
    <div>
      <h3>{questions[currentQuestionIndex].question}</h3>
      <p>{questions[currentQuestionIndex].example}</p>
      <br></br>
      <form onSubmit={handleSubmit}>
        <label>
          <textarea
            type="text"
            name="answer1"
            value={answers.answer1}
            onChange={handleChange}
          />
        </label><br /><br />

        <label>
          <textarea
            type="text"
            name="answer2"
            value={answers.answer2}
            onChange={handleChange}
          />
        </label><br /><br />

        <button type="submit">Submit Answers</button>
      </form>
    </div>
  );
}

export default SemanticData;
