import express, { response } from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import { Feedback } from "./models/feedbackModel.js";

import * as dotenv from "dotenv";
dotenv.config();

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
