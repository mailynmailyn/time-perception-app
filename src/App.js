import React, { useState } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc } from "firebase/firestore"; 

function App() {
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await addDoc(collection(db, "user-inputs"), {
        text: input,
        timestamp: new Date(),
      });
      alert("Data saved successfully!");
      setInput("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="App">
      <h1>User Input</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Enter something..." 
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
