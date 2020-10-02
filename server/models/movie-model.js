const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Movie = new Schema(
  {
    name: { type: String, required: true },
    time: { type: [String], required: true },
    rating: { type: Number, required: false },
    priorety: { type: Number, required: true },
  },
  { timestamps: true }
);

const User = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  movies: [Movie],
});

module.exports = mongoose.model("user", User);
