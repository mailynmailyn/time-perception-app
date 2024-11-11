import React, { useState, useContext, } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig'; // Ensure Firebase is configured and exported from here
import { doc, setDoc } from 'firebase/firestore';
import { AudioContext } from './AudioContext';

function UserInfo() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({
    user_name: '',
    user_age: '',
    user_gender: ''
  });
  const { username } = useContext(AudioContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!answers.user_name || !answers.user_age || !answers.user_gender) {
      alert("Please ensure all fields are filled.");
      return;
    }

    try {
      const userRef = doc(db, 'Users', username); // Create a document reference with the username as the ID
      setDoc(userRef, {
        name: answers.user_name,
        age: answers.user_age,
        gender: answers.user_gender,
        user: username,
        timestamp: new Date()
      });
      setAnswers({ user_name: '', user_age: '', user_gender: '' }); // Clear the form after submission


      navigate('/audioplayer');


    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to save answers.");
    }
  };

  return (
    <div>
      <h1>Welcome !</h1>
      <h2>Please provide the following information.</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="user_name"
            value={answers.user_name}
            onChange={handleChange}
          />
        </label><br /><br />

        <label>
          Age:
          <input
            type="number"
            name="user_age"
            value={answers.user_age}
            onChange={handleChange}
            min="1"
            max="100"
          />
        </label><br /><br />

        <label>
          Gender:
          <select
            name="user_gender"
            value={answers.user_gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other/Prefer not to say</option>
          </select>
        </label><br /><br />

        <button type="submit">Submit Answers</button>
      </form>
    </div>
  );
}

export default UserInfo;
