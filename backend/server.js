import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const users = [
  { id: 1, username: 'user', password: 'password' },
  { id: 2, username: 'lisa', password: 'falter'}
];

const JWT_SECRET = '1234'; //sollte ein sicherer Key sein!

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Authenticate User
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // User authenticated
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    // User not authenticated
    res.status(401).send('Ungültiger User');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});