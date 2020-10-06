const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var passport = require("passport");
const db = require("./db");
const movieRouter = require("./routes/movie-router");
const app = express();
const apiPort = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
db.on("error", console.error.bind(console, "MongoDB connection error:"));
app.use("/api", movieRouter);
//Passport middleware
app.use(passport.initialize());

//Config for JWT strategy
require("./strategies/jsonwtStrategy")(passport);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
