const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const serviceAccount = require('./net-store-angular-firebase-adminsdk-gpzs0-64b7543b2b.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.get('/api/users', async (req, res) => {
  try {
    const usersSnapshot = await db.collection('users').get();
    const users = usersSnapshot.docs.map(doc => doc.data());
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Error fetching users');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
