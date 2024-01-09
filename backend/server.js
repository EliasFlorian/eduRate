import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import bodyParser from "body-parser";
import validator from "express-validator";
import { jwtDecode } from "jwt-decode";
import bcrypt from "bcrypt";

import User from "./models/userModel.js";
import { Lecture, Feedback } from "./models/feedbackModel.js";

//---------------------------

//import router from "./routes/handler.js";
import mongoose from "mongoose";

import dotenv from "dotenv";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
dotenv.config({ path: ".env.local" });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use("/", router);


const { check, validationResult } = validator;
app.use(express.json());

const users = [
  { id: 1, username: "user", password: "password" },
  { id: 2, username: "lisa", password: "falter" },
];

const lectures = [
  {
    id: 1,
    ort: "HTL",
    date: "2019-01-01",
    start: "13::55::26",
    end: "17::55::26",
  },
  {
    id: 2,
    ort: "Gymnasium",
    date: "2023-04-06",
    start: "13::55::26",
    end: "17::55::26",
  },
];

const feedback = [
  { lectureID: 1, rankingCategory1: 3, rankingCategory2: 4, rankingCategory3: 3, rankingCategory4: 3, rankingCategory5: 3, feedback: "cool" },
  { lectureID: 2, rankingCategory1: 5, rankingCategory2: 6, rankingCategory3: 3, rankingCategory4: 2, rankingCategory5: 10, feedback: "nice" }
];

//========================================================================================================================================================

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username: username }).exec();

    // If user is found, compare the submitted password with the stored hash
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // If passwords match, create a token
        const token = jwt.sign(
          { id: user._id, username: user.username },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        res.json({ token });
      } else {
        // If passwords don't match, send a 401 Unauthorized response
        res.status(401).send("Ungültiger User");
      }
    } else {
      // If user is not found, send a 401 Unauthorized response
      res.status(401).send("Ungültiger User");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Endpoint to create a new user
app.post("/register", async (req, res) => {
  try {
    // Check if user already exists
    let user = await User.findOne({ username: req.body.username }).exec();
    if (user) {
      return res.status(400).send("User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // the number 10 here is the salt rounds

    // Create a new user
    user = new User({
      username: req.body.username,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    // Respond with success message
    res.status(201).send("User created successfully");
  } catch (error) {
    // If an error occurs, respond with the error message
    res.status(500).send(error.message);
  }
});

// Endpoint to create a new lecture
app.post("/lecture", async (req, res) => {
  // Extract the lecture details from the request body
  const { ort, date, start, end, lecturer } = req.body;

  try {
    // Create a new lecture document
    const lecture = new Lecture({
      ort,
      date,
      start,
      end,
      lecturer
      // Add other fields as necessary
    });

    // Save the lecture to the database
    await lecture.save();

    // Respond with success message
    res.status(201).send("Lecture created successfully");
  } catch (error) {
    // If an error occurs, respond with the error message
    console.error(error);
    res.status(500).send(error.message);
  }
});

//========================================================================================================================================================
//========================================================================================================================================================

app.get("/lectureList", async (req, res) => {
  // check token?
  try {
    const tok = jwtDecode(req.headers.authorization);
    const userID = tok.id;
    const lecturer = tok.username;

    let lecture = await Lecture.find();
    console.log(lecture);
    // should look fort the lecturerID instead of lecture ID, but field is not yet implemented
    const result = lecture.filter(function (l) {
      return l.lecturer == lecturer;
    });
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(401);
    res.send("invalid token!");
  }
});
/*
app.post(
  "/lecture",
  [
    check("ort").notEmpty(),
    check("date").notEmpty(),
    check("start").notEmpty(),
    check("end").notEmpty(),
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
  }
);
*/
app.post(
  "/feedback",
  [
    check("lectureID").notEmpty(),
    check("rankingCategory1").isInt({ min: 0, max: 10 }),
    check("rankingCategory2").isInt({ min: 0, max: 10 }),
    check("rankingCategory3").isInt({ min: 0, max: 10 }),
    check("rankingCategory4").isInt({ min: 0, max: 10 }),
    check("rankingCategory5").isInt({ min: 0, max: 10 }),
    check("feedback").notEmpty(),
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
  }
);

app.get("/feedback", (req, res) => {
  // get feedback list from database
  const lectureID = req.query.lectureID;
  const result = feedback.filter(function (p) {
    return p.lectureID == lectureID;
  });
  res.json(result);
});


// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("App connected to database");

    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
