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
      const userCollectionRef = collection(db, 'Users', username, 'SongData');
      const snapshot = await getDocs(userCollectionRef);
      
      const items = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const songData = { id: doc.id, ...doc.data() };
          const semanticDataRef = collection(doc.ref, 'SemanticData');
          const semanticSnapshot = await getDocs(semanticDataRef);

          // Map semantic data documents to an array
          const semanticData = semanticSnapshot.docs.map(semanticDoc => ({
            semanticId: semanticDoc.id,
            ...semanticDoc.data(),
          }));

          return { ...songData, semanticData };
        })
      );

      setData(items);
      setLoading(false);
    };

    fetchData();
  }, [username]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Your Results</h2>
      <h4>How did you do?</h4>
      <table>
        <thead>
          <tr>
            {fieldsToDisplay.map((field, index) => (
              <th key={index}>{field}</th>
            ))}
            <th>Semantic Data</th>
          </tr>
        </thead>
        <tbody>
          {data.map((doc) => (
            <tr key={doc.id}>
              {fieldsToDisplay.map((field, i) => (
                <td key={i}>{doc[field] || "N/A"}</td>
              ))}
              <td>
                <table>
                  <thead>
                    <tr>
                      <th>Question</th>
                      <th>Response</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doc.semanticData.map((semantic) => (
                      <tr key={semantic.semanticId}>
                        <td>{semantic.question}</td>
                        <td>{semantic.response}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Results;
