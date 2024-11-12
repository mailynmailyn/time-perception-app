// PublicData.js
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import '../styling/results.css';

function Results() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define the fields you want to display
  const fieldsToDisplay = ['username', 'song', 'version', 'time']; // Add 'username' to display which user the data belongs to

  useEffect(() => {
    const fetchData = async () => {
      const usersCollectionRef = collection(db, 'Users');
      const usersSnapshot = await getDocs(usersCollectionRef);

      let allData = [];

      for (const userDoc of usersSnapshot.docs) {
        const username = userDoc.id; // Assuming the user's document ID represents their username
        const songDataCollectionRef = collection(db, 'Users', username, 'SongData');
        const songDataSnapshot = await getDocs(songDataCollectionRef);

        // Add each song data document with username info
        const userData = songDataSnapshot.docs.map(doc => ({
          id: doc.id,
          username, // Include the username to identify the user in the table
          ...doc.data(),
        }));

        allData = allData.concat(userData);
      }

      setData(allData);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Results for All Users</h2>
      <h4>How did everyone do?</h4>
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
