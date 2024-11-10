const admin = require('firebase-admin');
const fs = require('fs');
const { Parser } = require('json2csv');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();

async function exportToCSV() {
  const collectionRef = db.collection('Users'); // Replace with your collection name
  const snapshot = await collectionRef.get();
  const data = [];

  snapshot.forEach(doc => {
    data.push(doc.data());
  });

  const json2csvParser = new Parser();
  const csv = json2csvParser.parse(data);

  fs.writeFileSync('exported_data.csv', csv); // Save as CSV file
  console.log('Firestore data exported to exported_data.csv');
}

exportToCSV().catch(console.error);
