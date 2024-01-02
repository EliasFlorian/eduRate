/*import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Feedback } from "./models/feedbackModel.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome");
});

// Routes
app.post("/feedback", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author) {
      return res.status(400).send({
        message: "Send all required fiels",
      });
    }
    const newFeedback = {
      title: req.body.title,
      author: req.body.author,
    };

    const feedback = await Feedback.create(newFeedback);

    return res.status(201).send(feedback);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");

    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
*/

import bodyParser from 'body-parser';
import express from 'express';
import router from './routes/handler.js'


const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', router);

const PORT = process.env.PORT || 3000;

const lectures = {};

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

/*
POST Feedback

/ POST Ort Datum Start ende
/ GET liste mit vorträgen (session)
/ GET feedback
/ Login endpoint
*/