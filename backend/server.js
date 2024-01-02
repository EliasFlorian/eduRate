import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import bodyParser from 'body-parser';
import validator from 'express-validator'

const app = express();
const { check, validationResult } = validator;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


const users = [
  { id: 1, username: 'user', password: 'password' },
  { id: 2, username: 'lisa', password: 'falter'}
];

const lectures = [
  { id: 1, ort: "HTL", date: "2019-01-01", start: "13::55::26", end: "17::55::26"},
  { id: 2, ort: "Gymnasium", date: "2023-04-06", start: "13::55::26", end: "17::55::26"}
];

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
    // get lecture list from database
    res.json(lectures);
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
    return res.send(lectures);
  }

  res.send({ errors: result.array() });
});

app.post("/feedback", [
  check('rankingCategory1').isInt({ min: 0, max: 5 }),
  check('rankingCategory2').notEmpty(),
  check('rankingCategory3').notEmpty(),
  check('rankingCategory4').notEmpty(),
  check('rankingCategory5').notEmpty(),
  check('rankingCategory6').notEmpty(),
], 
(req, res) => {

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});