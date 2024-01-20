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

const admin = 'alex';

const { check, validationResult } = validator;
app.use(express.json());


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
  const { ort, datum, startzeit, endzeit } = req.body.formData;
  console.log(req.body.formData);
  const tok = jwtDecode(req.headers.authorization);
    const lecturer = tok.username;

  try {
    // Create a new lecture document
    const lecture = new Lecture({
      ort,
      datum,
      startzeit,
      endzeit,
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

  try {
    const tok = jwtDecode(req.headers.authorization);
    const userID = tok.id;
    const lecturer = tok.username;

    let lecture = await Lecture.find({ ort: { $exists: true } });
    console.log(lecture);
    if(lecturer != admin) {
      lecture = lecture.filter(function (l) {
        return l.lecturer == lecturer;
      });
    }
    console.log(lecture);
    res.json(lecture);
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
app.post("/feedback",
  [
    check("id").notEmpty(),
    check("rating1").isInt({ min: 0, max: 10 }),
    check("rating2").isInt({ min: 0, max: 10 }),
    check("rating3").isInt({ min: 0, max: 10 }),
    check("rating4").isInt({ min: 0, max: 10 }),
    check("rating5").isInt({ min: 0, max: 10 }),
    check("feedback").notEmpty(),
  ], 
  async (req, res) => {
    const result = validationResult(req.body.ratingsData);

    // check if form is valid
    if (result.isEmpty()) {
      const { id, rating1, rating2, rating3, rating4, rating5, feedback } = req.body.ratingsData;
      try {
        // Create a new lecture document
        const feed = new Feedback({
          id, rating1, rating2, rating3, rating4, rating5, feedback
        });
    
        // Save the lecture to the database
        await feed.save();
    
        // Respond with success message
        res.status(201).send("Feedback created successfully");
      } catch (error) {
        // If an error occurs, respond with the error message
        console.error(error);
        res.status(500).send(error.message);
      }
    }
  }
);


app.get("/feedback", async (req, res) => {
  // get feedback list from database
  const lectureID = req.query.lectureID;
  //console.log(feedback);
  const query = { id: lectureID };
  const result = await Feedback.find(query);

  res.json(result);
});




//delete lecture entry
app.delete("/lecture/:id", async (req, res) => {
  const lectureId = req.params.id;
  try {
      // find the lecture by ID and delete it
      const result = await Lecture.findByIdAndDelete(lectureId);

      if (result) {
          res.status(200).send("Lecture deleted successfully");
      } else {
          res.status(404).send("Lecture not found");
      }
  } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
  }
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
