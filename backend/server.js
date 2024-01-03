import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import { jwtDecode } from "jwt-decode";

const app = express();
const { check, validationResult } = validator;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


const users = [
  { id: 1, username: 'user', password: 'password' },
  { id: 2, username: 'lisa', password: 'falter' }
];

const lectures = [
  { id: 1, ort: "HTL", date: "2019-01-01", start: "13::55::26", end: "17::55::26" },
  { id: 2, ort: "Gymnasium", date: "2023-04-06", start: "13::55::26", end: "17::55::26" }
];

const feedback = [
  { lectureID: 1, rankingCategory1: 3, rankingCategory2: 4, rankingCategory3: 3, rankingCategory4: 3, rankingCategory5: 3, feedback: 'cool' },
  { lectureID: 1, rankingCategory1: 5, rankingCategory2: 6, rankingCategory3: 3, rankingCategory4: 2, rankingCategory5: 10, feedback: 'cool' }
]

const JWT_SECRET = '1234'; //sollte ein sicherer Key sein!

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Authenticate User
  const user = users.find(u => u.username === username && u.password === password);
  console.log(req.body);
  if (user) {
    // User authenticated
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    // User not authenticated
    res.status(401).send('Ungültiger User');
  }
});

app.get("/lectureList", (req, res) => {
    // check token?
  try {
    const tok = jwtDecode(req.headers.authorization);
    const userID = tok.id;
    // should look fort the lecturerID instead of lecture ID, but field is not yet implemented
    const result = lectures.filter(function(l) { return l.id == userID });
    res.json(result);
  }
  catch(err) {
    console.log(err);
    res.status(401);
    res.send('invalid token!');
  }
});

app.post("/lecture", [
  check('ort').notEmpty(),
  check('date').notEmpty(),
  check('start').notEmpty(),
  check('end').notEmpty(),
], 
(req, res) => {
  const result = validationResult(req);

  // check if form is valid
  if (result.isEmpty()) {
    const lecture = req.body;
    // TODO: add to database, get lecturer through session management
    lecture["id"] = lectures.length + 1;
    lectures.push(lecture);
    console.log(lectures);
    return res.send(lectures);
  }

  console.log(req.body);
  res.send({ errors: result.array() });
});

app.post("/feedback", [
  check('lectureID').notEmpty(),
  check('rankingCategory1').isInt({ min: 0, max: 10 }),
  check('rankingCategory2').isInt({ min: 0, max: 10 }),
  check('rankingCategory3').isInt({ min: 0, max: 10 }),
  check('rankingCategory4').isInt({ min: 0, max: 10 }),
  check('rankingCategory5').isInt({ min: 0, max: 10 }),
  check('feedback').notEmpty()
], 
(req, res) => {
  const result = validationResult(req);

  // check if form is valid
  if (result.isEmpty()) {
    // TODO: feedback to database
    feedback.push(req.body);
    return res.send(feedback);
  }
  
  res.send({ errors: result.array() });
});

app.get("/feedback", (req, res) => {
  // get feedback list from database
  const lectureID = req.query.lectureID;
  const result = feedback.filter(function(p) { return p.lectureID == lectureID })
  res.json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});