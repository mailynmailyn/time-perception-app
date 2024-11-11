// PublicData.js
import React, { useEffect, useState, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { AudioContext } from "./AudioContext";
import '../styling/results.css';

function Results() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { username } = useContext(AudioContext);

  // Define the fields you want to display
  const fieldsToDisplay = ['song', 'version', 'time']; // Update with the actual fields you want to show

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = collection(db, 'Users', username, 'SongData'); // Replace with your collection name
      const snapshot = await getDocs(collectionRef);
      
      // Fetch all documents and map them to an array of objects
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(items);
      setLoading(false);
    };

    fetchData();
  }, [username]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Your Results</h1>
      <h2>How did you do ?</h2>
      <table>
        <thead>
          <tr>
            {fieldsToDisplay.map((field, index) => (
              <th key={index}>{field}</th>  // Table header (specified fields)
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((doc) => (
            <tr key={doc.id}>
              {fieldsToDisplay.map((field, i) => (
                <td key={i}>{doc[field] || "N/A"}</td>  // Table row (fields)
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Results;
