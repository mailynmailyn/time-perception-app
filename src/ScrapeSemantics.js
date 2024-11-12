// PublicData.js
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import '../styling/results.css';

function Results() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllSemanticData = async () => {
      const usersCollectionRef = collection(db, 'Users');
      const usersSnapshot = await getDocs(usersCollectionRef);
      
      const allSemanticData = await Promise.all(
        usersSnapshot.docs.map(async (userDoc) => {
          const userId = userDoc.id;
          const songDataCollectionRef = collection(db, 'Users', userId, 'SongData');
          const songDataSnapshot = await getDocs(songDataCollectionRef);
          
          // Retrieve SemanticData for each SongData document
          const userSemanticData = await Promise.all(
            songDataSnapshot.docs.map(async (songDoc) => {
              const semanticDataCollectionRef = collection(songDoc.ref, 'SemanticQuestions');
              const semanticSnapshot = await getDocs(semanticDataCollectionRef);

              return semanticSnapshot.docs.map(semanticDoc => ({
                userId,
                songId: songDoc.id,
                ...semanticDoc.data(),
              }));
            })
          );

          // Flatten array of semantic data for each user's song data
          return userSemanticData.flat();
        })
      );

      setData(allSemanticData.flat());
      setLoading(false);
    };

    fetchAllSemanticData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Semantic Data for All Users</h2>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Song ID</th>
            <th>Question</th>
            <th>Response 1</th>
            <th>Response 2</th>
            <th>Response 3</th>
          </tr>
        </thead>
        <tbody>
          {data.map((semantic, index) => (
            <tr key={index}>
              <td>{semantic.userId}</td>
              <td>{semantic.songId}</td>
              <td>{semantic.question}</td>
              <td>{semantic.answer1}</td>
              <td>{semantic.answer2}</td>
              <td>{semantic.answer3}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Results;
