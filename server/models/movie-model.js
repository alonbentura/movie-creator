var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Movie = new Schema({
  name: { type: String, required: true },
  time: { type: String, required: true },
  rating: { type: Number, required: false },
  priorety: { type: Number, required: true },
});

module.exports = mongoose.model("movie", Movie);
