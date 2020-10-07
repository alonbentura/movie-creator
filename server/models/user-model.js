const mongoose = require("mongoose");
const Movie = require("./movie-model");

const Schema = mongoose.Schema;

const User = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  movies: [Movie],
});

module.exports = mongoose.model("user", User);
