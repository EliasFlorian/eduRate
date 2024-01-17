import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const lectureSchema = new mongoose.Schema(
  {
    //id: Number,
    ort: String,
    datum: String,
    startzeit: String,
    endzeit: String,
    lecturer: String
  },
  { timestamps: true }
);

const feedbackSchema = new mongoose.Schema({
  lectureID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lecture",
    required: true,
  },
  rankingCategory1: Number,
  rankingCategory2: Number,
  rankingCategory3: Number,
  rankingCategory4: Number,
  rankingCategory5: Number,
  feedback: String,
});

const Lecture = mongoose.model("Lecture", lectureSchema, "feedback-data");
const Feedback = mongoose.model("Feedback", feedbackSchema, "feedback-data");

export { Lecture, Feedback };

//export default mongoose.model("Feedback", FeedbackSchema, "feedback-data");
