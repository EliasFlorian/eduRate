import mongoose from "mongoose";

const { Schema } = mongoose;

const testSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  author: String,
});

export const Feedback = mongoose.model("Feedback", testSchema);
